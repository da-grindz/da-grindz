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
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
