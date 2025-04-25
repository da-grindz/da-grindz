import { prisma } from '@/lib/prisma';
import QuickBentoRunGrid from '@/components/QuickBentoRunGrid';

const QuickBentoRunDash = async () => {
  const items = await prisma.dashboardItem.findMany({
    where: {
      mood: {
        name: 'Quick Bento Run',
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

  return <QuickBentoRunGrid items={serializedItems} />;
};

export default QuickBentoRunDash;
