import { PrismaClient, Role, Condition, EateryType, EaterySubtype, VendingType } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  }

  // Stuff
  for (const data of config.defaultData) {
    const condition = (data.condition as Condition) || Condition.good;
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  // Eateries
  for (const eatery of config.defaultEateries) {
    console.log(`  Adding eatery: ${eatery.name}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.eatery.upsert({
      where: { name: eatery.name },
      update: {},
      create: {
        keywords: eatery.keywords,
        type: eatery.type as EateryType,
        subtype: eatery.subtype as EaterySubtype,
        name: eatery.name,
        location: eatery.location,
        room: eatery.room,
        floor: eatery.floor,
        hours: eatery.hours,
        phone: eatery.phone,
        email: eatery.email,
        website: eatery.website,
        notes: eatery.notes,
        x: eatery.x,
        y: eatery.y,
      },
    });
  }

  // Vending Machines
  for (const machine of config.defaultVendingMachines) {
    const type = (machine.type as VendingType) || VendingType.SNACK;
    console.log(`  Adding vending machine: ${machine.location} (${machine.type})`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.vendingMachine.upsert({
      where: { id: config.defaultVendingMachines.indexOf(machine) + 1 },
      update: {},
      create: {
        type,
        location: machine.location,
        hours: machine.hours,
        floor: machine.floor,
        x: machine.x,
        y: machine.y,
      },
    });
  }

  // Seed Allergies
  const allergies = [
    'Peanuts',
    'Tree Nuts',
    'Milk',
    'Fish',
    'Shellfish',
    'Wheat',
    'Gluten',
    'Sesame',
    'Mustard',
  ];

  for (const name of allergies) {
    console.log(`  Creating allergy: ${name}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.allergy.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Grindz Moods
  const moods = [
    {
      name: 'Vegetarian Vibes',
      items: [
        {
          name: 'Egg, Pesto, and Mozzarella Sandwich',
          image: 'https://globalassets.starbucks.com/digitalassets/products/food/'
          + 'EggPestoMozzarellaSandwich.jpg?impolicy=1by1_medium_630',
          alt: 'Egg, Pesto, and Mozzarella Sandwich from Starbucks',
          source: 'Starbucks - Egg, Pesto, and Mozzarella Sandwich',
          nutrition: 'Calories: 390 | Protein: 21g | Fat: 16g | Carbs: 36g',
        },
        {
          name: 'Greens n Ginger Smoothie',
          image: 'https://tb-static.uber.com/prod/image-proc/processed_images/'
          + '20104fcef39781fc0cc069d42675e8f2/0fb376d1da56c05644450062d25c5c84.jpeg',
          alt: 'Greens n Ginger smoothie from Jamba Juice',
          source: 'Jamba Juice - Greens n Ginger',
          nutrition: 'Calories: 290 | Protein: 4g | Fat: 1g | Carbs: 70g',
        },
        {
          name: 'Veggie Delight',
          image: 'https://subwayisfresh.com.sg/wp-content/uploads/2022/01/Menuitem-Veggie-Delite.jpg',
          alt: 'Veggie Delight from Subway',
          source: 'Subway - Veggie Delight',
          nutrition: 'Calories: 250 | Protein: 10g | Fat: 6g | Carbs: 39g',
        },
        {
          name: 'Veggie Spring Rolls',
          image: 'https://i.redd.it/z8hy5fs8qx451.jpg',
          alt: 'Veggie Spring Rolls from Panda Express',
          source: 'Panda Express - Veggie Spring Rolls',
          nutrition: 'Calories: 296 | Protein: 7g | Fat: 12g | Carbs: 38g',
        },
      ],
    },
    {
      name: 'Quick Bento Run',
      items: [
        {
          name: 'Furikake Fish Plate',
          image: 'https://s3-media0.fl.yelpcdn.com/bphoto/1IqjvZEaXYotY1C3LLlAbA/o.jpg',
          alt: 'Furikake Fish Plate from Campus Center Food Court',
          source: 'Campus Center Food Court - Furikake Fish Plate',
          nutrition: 'Calories: 750 | Protein: 30g | Fat: 26g | Carbs: 95g',
        },
        {
          name: 'Musubis',
          image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holoholo_big.jpg',
          alt: 'Musubis from HoloHolo Bistro',
          source: 'Holoholo Bistro - Musubis',
          nutrition: 'Calories: 280 | Protein: 7g | Fat: 0.5g | Carbs: 58g',
        },
        {
          name: 'Mini Chicken Katsu Plate',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,'
          + 'format=auto,quality=90/media/photosV2/d179748a-7b0a-4101-b0f1-f08f8eae53bf-retina-large.jpg',
          alt: 'Mini Chicken Katsu Plate from L&L',
          source: 'L&L - Mini Chicken Katsu Plate',
          nutrition: 'Calories: 970 | Protein: 37g | Fat: 50g | Carbs: 97g',
        },
        {
          name: 'Garlic Chicken Bento',
          image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holob_big2.jpg',
          alt: 'Garlic Chicken Bento from HoloHolo Bistro',
          source: 'Holoholo Bistro - Garlic Chicken Bento',
          nutrition: 'Calories: 900 | Protein: 36g | Fat: 35g | Carbs: 95g',
        },
      ],
    },
    {
      name: 'Grindz for Gains',
      items: [
        {
          name: 'Grilled Teriyaki Chicken',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStEIUPt5aA-72zVIXhanUlwNbmSgW6_qbkA&s',
          alt: 'Grilled Teriyaki Chicken from Panda Express',
          source: 'Panda Express - Grilled Teriyaki Chicken',
          nutrition: 'Calories: 275 | Protein: 33g | Fat: 10g | Carbs: 14g',
        },
        {
          name: 'Grilled Chicken Wrap',
          image: 'https://www.sabwaymenu.com/wp-content/uploads/2024/10/grilled-chicken-460-cals-670ca5953854e.webp',
          alt: 'Grilled Chicken Wrap from Subway',
          source: 'Subway - Grilled Chicken Wrap',
          nutrition: 'Calories: 470 | Protein: 42g | Fat: 11g | Carbs: 54g',
        },
        {
          name: 'BBQ Chicken Plate',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,'
          + 'format=auto,quality=90/media/photos/d8be0933-1adb-4b0a-a402-fd9b9b14da61-retina-large-jpeg',
          alt: 'BBQ Chicken Plate from L&L',
          source: 'L&L - BBQ Chicken Plate',
          nutrition: 'Calories: 1175 | Protein: 66g | Fat: 55g | Carbs: 100g',
        },
        {
          name: "B'rito Bowl",
          image: 'https://images-prd.sodexomyway.net/web/en-us/media/BRITO%20BOWLS%20SMW%20HEADER_tcm17-32511.jpg',
          alt: "Bowl from B'rito",
          source: "B'rito - Bowl",
          nutrition: 'Calories: 770 | Protein: 35g | Fat: 28g | Carbs: 62g',
        },
      ],
    },
  ];

  for (const mood of moods) {
    console.log(`  Creating mood: ${mood.name}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.mood.upsert({
      where: { name: mood.name },
      update: {},
      create: {
        name: mood.name,
        items: {
          create: mood.items,
        },
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
