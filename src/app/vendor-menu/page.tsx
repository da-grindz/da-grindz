import { prisma } from '@/lib/prisma';
import VendorMenuClient from './VendorMenuClient';

const VendorMenuPage = async () => {
  const vendors = await prisma.eatery.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return <VendorMenuClient vendors={vendors} />;
};

export default VendorMenuPage;
