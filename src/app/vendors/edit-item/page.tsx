import EditVendorItemForm from '@/components/EditVendorItemForm';
import { prisma } from '@/lib/prisma';

const EditVendorItemPage = async ({ params }: { params: { id: string } }) => {
  const item = await prisma.vendorItem.findUnique({
    where: { id: parseInt(params.id, 10) },
    include: { allergies: true },
  });

  if (!item) {
    return (
      <main>
        <h1>Item not found</h1>
      </main>
    );
  }

  return (
    <main>
      <EditVendorItemForm
        item={{
          id: item.id.toString(),
          name: item.name,
          image: item.image,
          alt: item.alt,
          /* description: item.description, */
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
