/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, role, eateryName } = body;

    // Validate input
    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update the user's role and eatery
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
        eatery: eateryName
          ? { connect: { name: eateryName } }
          : { disconnect: true }, // Disconnect eatery if none is provided
      },
    });

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
