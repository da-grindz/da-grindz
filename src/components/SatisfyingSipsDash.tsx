import { prisma } from '@/lib/prisma';
import SatisfyingSipsGrid from '@/components/SatisfyingSipsGrid';

const SatisfyingSipsDash = async () => {
  const items = await prisma.dashboardItem.findMany({
    where: {
      mood: {
        name: 'Satisfying Sips',
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

  return <SatisfyingSipsGrid items={serializedItems} />;
};

export default SatisfyingSipsDash;
