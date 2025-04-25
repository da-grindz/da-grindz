import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler() {
  const eateries = await prisma.eatery.findMany();
  const vendingMachines = await prisma.vendingMachine.findMany();

  return NextResponse.json({ eateries, vendingMachines });
}

export default { GET: handler };
