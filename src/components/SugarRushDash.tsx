import { prisma } from '@/lib/prisma';
import SugarRushGrid from '@/components/SugarRushGrid';

const SugarRushDash = async () => {
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
    source: item.source,
    nutrition: item.nutrition,
  }));

  return <SugarRushGrid items={serializedItems} />;
};

export default SugarRushDash;
