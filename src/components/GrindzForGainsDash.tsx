import { prisma } from '@/lib/prisma';
import GrindzForGainsGrid from '@/components/GrindzForGainsGrid';

const GrindzForGainsDash = async () => {
  const items = await prisma.dashboardItem.findMany({
    where: {
      mood: {
        name: 'Grindz for Gains',
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

  return <GrindzForGainsGrid items={serializedItems} />;
};

export default GrindzForGainsDash;
