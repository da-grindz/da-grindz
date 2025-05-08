/* eslint-disable import/prefer-default-export */
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse('Not authenticated', { status: 401 });
    }

    const { email } = session.user;

    // Step 1: Get current mood
    const user = await prisma.user.findUnique({
      where: { email },
      include: { grindzMood: true },
    });

    const currentMood = user?.grindzMood?.name;

    const moods = [
      'Vegetarian Vibes',
      'Quick Bento Run',
      'Grindz for Gains',
      'Satisfying Sips',
      'Sugar Rush',
    ];

    // Step 2: Filter out the current mood
    const otherMoods = moods.filter((mood) => mood !== currentMood);

    // Step 3: Pick a new one
    const randomMood = otherMoods[Math.floor(Math.random() * otherMoods.length)];

    await prisma.user.update({
      where: { email },
      data: {
        grindzMood: {
          connect: { name: randomMood },
        },
      },
    });

    return NextResponse.json({ success: true, mood: randomMood });
  } catch (error) {
    console.error('Error randomizing mood:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
