import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import PreferencesForm from '@/components/PreferencesForm';

export default async function EditAllergiesPage() {
  // Protect the page, only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const currentUser = session?.user?.email || '';
  // Fetch user data or preferences if needed
  const user = await prisma.user.findUnique({
    where: { email: currentUser },
    include: {
      allergies: true,
      grindzMood: true,
    },
  });
  if (!user) {
    return notFound();
  }
  return (
    <main>
      <PreferencesForm />
    </main>
  );
}
