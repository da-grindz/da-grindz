import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export default function helperFunction() {
  return 'This is a helper function';
}

export async function GET() {
  try {
    const eateries = await prisma.eatery.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(eateries);
  } catch (error) {
    console.error('Failed to fetch eateries:', error);
    return NextResponse.json({ error: 'Failed to fetch eateries' }, { status: 500 });
  }
}
