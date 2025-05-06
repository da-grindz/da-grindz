import EditVendorItemForm from '@/components/EditVendorItemForm';
import { prisma } from '@/lib/prisma';

const EditVendorItemPage = async ({ params }: { params: { id: string } }) => {
  const itemId = parseInt(params.id, 10);

  if (Number.isNaN(itemId)) {
    return (
      <main>
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg">
          Item not found. Please check the URL and try again.
        </p>
      </main>
    );
  }

  const item = await prisma.vendorItem.findUnique({
    where: { id: parseInt(params.id, 10) }, // Parse params.id as an integer
    include: {
      allergies: true, // Include related allergies
    },
  });

  if (!item) {
    return (
      <main>
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg">
          Item not found. Please check the URL and try again.
        </p>
      </main>
    );
  }

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
};

export default EditVendorItemPage;
