import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import PlannerClient from './PlannerClient';

export default async function PlannerPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { grindzMood: true },
  });

  const mood = user?.grindzMood?.name || null;

  return <PlannerClient mood={mood} />;
}
