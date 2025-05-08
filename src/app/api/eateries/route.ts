/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const eateries = await prisma.eatery.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc', // Sort by name in ascending order
      },
    });
    return NextResponse.json(eateries);
  } catch (error) {
    console.error('Failed to fetch eateries:', error);
    return NextResponse.json({ error: 'Failed to fetch eateries' }, { status: 500 });
  }
}
