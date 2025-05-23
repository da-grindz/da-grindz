import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import PreferencesForm from '@/components/PreferencesForm';

/* This page is for editing the user's allergies and grindz mood. */
export default async function EditPreferencesPage() {
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
  console.log('Rendering PreferencesForm...');
  const userAllergies = user.allergies.map((allergy) => allergy.name);

  return (
    <main>
      <PreferencesForm userAllergies={userAllergies} />
    </main>
  );
}
