import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddVendorItemForm from '@/components/AddVendorItemForm';
import { prisma } from '@/lib/prisma'; // Adjust if you import prisma differently
import { Container } from 'react-bootstrap';

const AddVendorItemPage = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  try {
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
          <Container>
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-lg">
              You do not have a vendor associated with your account.
            </p>
          </Container>
        </main>
      );
    }

    return (
      <main>
        <AddVendorItemForm
          vendorId={vendorId.toString()}
          owner={user?.email || ''}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching vendor ID:', error);
    return (
      <main>
        <Container>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-lg">
            An unexpected error occurred. Please try again later.
          </p>
        </Container>
      </main>
    );
  }
};

export default AddVendorItemPage;
