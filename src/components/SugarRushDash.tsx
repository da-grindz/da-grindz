import { prisma } from '@/lib/prisma';
import VegetarianVibesGrid from '@/components/VegetarianVibesGrid';

const VegetarianVibesDash = async () => {
  const items = await prisma.dashboardItem.findMany({
    where: {
      mood: {
        name: 'Vegetarian Vibes',
      },
    },
  });

  const serializedItems = items.map((item) => ({
    id: item.id,
    image: item.image,
    alt: item.alt,
    source: item.source,
    nutrition: item.nutrition,
  }));

  return <VegetarianVibesGrid items={serializedItems} />;
};

export default VegetarianVibesDash;
