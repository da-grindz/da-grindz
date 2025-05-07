import EditVendorItemForm from '@/components/EditVendorItemForm';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container } from 'react-bootstrap';

const EditVendorItemPage = async ({ params }: { params: { id: string } }) => {
  // Get the current session to check if the user is logged in
  const session = await getServerSession(authOptions);

  // Protect the page for logged-in users
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const itemId = parseInt(params.id, 10);

  if (Number.isNaN(itemId)) {
    return (
      <main>
        <Container>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-lg">
            Item not found. Please check the URL and try again.
          </p>
        </Container>
      </main>
    );
  }

  try {
    // Fetch the vendor item from the database
    const item = await prisma.vendorItem.findUnique({
      where: { id: itemId },
      include: {
        allergies: true, // Include related allergies
      },
    });

    // If the item does not exist, show an error
    if (!item) {
      return (
        <main>
          <Container>
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-lg">
              Item not found.
            </p>
          </Container>
        </main>
      );
    }

    // Render the EditVendorItemForm with the item data
    return (
      <main>
        <EditVendorItemForm
          item={{
            id: item.id,
            name: item.name,
            image: item.image,
            alt: item.alt,
            price: item.price,
            description: item.description,
            calories: item.calories,
            protein: item.protein,
            fat: item.fat,
            carbs: item.carbs,
            allergies: item.allergies.map((a) => a.name),
            vendorId: item.eateryId.toString(),
          }}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching vendor item:', error);
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

export default EditVendorItemPage;
