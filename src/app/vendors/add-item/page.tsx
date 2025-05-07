import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddVendorItemForm from '@/components/AddVendorItemForm';
import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';

const AddVendorItemPage = async () => {
  // Get the current session to check if the user is logged in
  const session = await getServerSession(authOptions);

  // Protect the page for logged-in users
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const user = session?.user;

  try {
    // Fetch the vendorId associated with the logged-in user's eatery
    const dbUser = await prisma.user.findUnique({
      where: { email: user?.email ?? '' },
      select: {
        eatery: {
          select: { id: true },
        },
      },
    });

    const vendorId = dbUser?.eatery?.id;

    // If the user does not have a vendor associated with their account, show an error
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

    // Render the AddVendorItemForm with the vendorId and user email
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
