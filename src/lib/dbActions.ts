'use server';

import { Stuff, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Adds or updates a user's preferences: allergies (many-to-many) and grindz mood (one-to-many).
 * @param preferences, an object with the following properties: owner (email), allergies array of names, and mood name.
 */
export async function addPreferences(preferences: { owner: string; allergies: string[]; mood: string }) {
  const { owner, allergies, mood } = preferences;
  console.log('Preferences:', preferences);

  try {
    // Update the user's preferences
    await prisma.user.update({
      where: { email: owner },
      data: {
        // Clear existing allergies and set the new ones
        allergies: {
          set: [], // Clear all existing allergies
          connectOrCreate: allergies.map((name) => ({
            where: { name }, // Check if the allergy exists
            create: { name }, // Create the allergy if it doesn't exist
          })),
        },
        // Update the grindz mood
        grindzMood: {
          connectOrCreate: {
            where: { name: mood },
            create: { name: mood },
          },
        },
      },
    });

    console.log('Allergies:', allergies);
    console.log('Mood:', mood);
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw new Error('Failed to update preferences. Please try again.');
  }
}
/**
 * Adds a new menu item to the database.
 * @param VendorItem, an object with the following properties: id, name, image, alt,
 * calories, fat, carbs, protein, price, description, eatery, eateryId, allergies.
 */
export async function addVendorItem(item: {
  owner: string;
  vendorId: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  description: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  allergies: string[];
}) {
  const { owner, vendorId, name, image, alt, price, description, calories, fat, carbs, protein, allergies } = item;

  if (!owner) {
    throw new Error('Missing owner email.');
  }

  console.log('Adding vendor item:', item);

  try {
    // Ensure the vendorId is valid
    const eatery = await prisma.eatery.findUnique({
      where: { id: parseInt(vendorId, 10) },
    });

    if (!eatery) {
      throw new Error('Eatery not found.');
    }

    // Add the vendor item to the database
    const newItem = await prisma.vendorItem.create({
      data: {
        name,
        image,
        alt,
        price,
        description,
        calories,
        fat,
        carbs,
        protein,
        eatery: {
          connect: { id: parseInt(vendorId, 10) },
        },
        allergies: {
          connectOrCreate: allergies.map((allergyName) => ({
            where: { name: allergyName },
            create: { name: allergyName },
          })),
        },
      },
      include: {
        allergies: true,
      },
    });

    console.log('Created item:', newItem.name);
    return newItem;
  } catch (error) {
    console.error('Error adding vendor item:', error);
    throw new Error('Failed to add vendor item. Please try again.');
  }
}

/**
 * Edits an existing menu item in the database.
 * @param VendorItem, an object with the following properties: id, name, image, alt,
 * calories, fat, carbs, protein, price, description, eatery, eateryId, allergies.
 */
export async function editVendorItem(item: {
  id: number;
  name: string;
  image: string;
  alt: string;
  vendorId: string;
  price: number;
  description: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  allergies: string[]; // allergy names
}) {
  const {
    id,
    name,
    image,
    alt,
    price,
    description,
    calories,
    fat,
    carbs,
    protein,
    allergies,
  } = item;

  console.log('Editing vendor item:', item);

  try {
    // Update the VendorItem
    const updatedItem = await prisma.vendorItem.update({
      where: { id }, // Locate the item by its id
      data: {
        name,
        image,
        alt,
        price,
        description,
        calories,
        fat,
        carbs,
        protein,
        allergies: {
          // Connect or create allergies, similar to how we did for addVendorItem
          connectOrCreate: allergies.map((allergyName) => ({
            where: { name: allergyName }, // Unique field in Allergy model
            create: { name: allergyName }, // Create allergy if it doesn't exist
          })),
        },
      },
      include: {
        allergies: true, // Optionally include allergies for the response
      },
    });

    console.log('Updated item:', updatedItem.name);
    return updatedItem;
  } catch (error) {
    console.error('Error editing vendor item:', error);
    throw new Error('Failed to edit vendor item. Please try again.');
  }
}

/**
 * Removes an existing menu item from the database.
 * @param id,  The id of the menu item to delete.
 */
export const deleteVendorItem = async (id: number) => {
  try {
    await prisma.vendorItem.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Failed to delete vendor item:', error);
    throw error;
  }
};
