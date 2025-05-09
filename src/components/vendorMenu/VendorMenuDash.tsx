import { prisma } from '../../lib/prisma';
import VendorMenuGrid from './VendorMenuGrid';

const VendorMenuDash = async () => {
  const items = await prisma.dashboardItem.findMany({
    where: {
      mood: {
        name: 'Sugar Rush',
      },
    },
  });

  const serializedItems = items.map((item) => ({
    id: item.id,
    image: item.image,
    alt: item.alt,
    name: item.name,
    calories: 0,
    description: item.nutrition,
    price: 0.0,
  }));

  return <VendorMenuGrid items={serializedItems} />;
};

export default VendorMenuDash;
