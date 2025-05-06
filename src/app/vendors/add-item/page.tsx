import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddVendorItemForm from '@/components/AddVendorItemForm';
import { prisma } from '@/lib/prisma'; // Adjust if you import prisma differently

const AddVendorItemPage = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch vendorId from user's eatery
  const dbUser = await prisma.user.findUnique({
    where: { email: user?.email ?? '' },
    select: {
      eatery: {
        select: { id: true },
      },
    },
  });

  const vendorId = dbUser?.eatery?.id;

  if (!vendorId) {
    return (
      <main>
        <p>You must be associated with a vendor to add items.</p>
      </main>
    );
  }

  return (
    <main>
      <AddVendorItemForm vendorId={vendorId.toString()} />
    </main>
  );
};

export default AddVendorItemPage;
