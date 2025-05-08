/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        eatery: {
          select: {
            name: true,
          },
        },
      },
    });

    // Disable caching
    const response = NextResponse.json(users);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
