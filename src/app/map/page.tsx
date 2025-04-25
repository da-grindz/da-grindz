import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const MapPage = async () => {
  const [eateries, vendingMachines] = await Promise.all([
    prisma.eatery.findMany(),
    prisma.vendingMachine.findMany(),
  ]);

  return (
    <main style={{ height: '100vh' }}>
      <Map eateries={eateries} vendingMachines={vendingMachines} />
    </main>
  );
};

export default MapPage;
