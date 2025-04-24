'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'react-bootstrap';

const DashboardButtons = () => {
  const pathname = usePathname();

  return (
    <>
      <Link href="/planner" passHref>
        <Button variant={pathname === '/planner' ? 'primary' : 'outline-primary'} className="me-3">
          Planner
        </Button>
      </Link>
      <Link href="/preferences" passHref>
        <Button variant={pathname === '/preferences' ? 'primary' : 'outline-primary'} className="me-3">
          Preferences
        </Button>
      </Link>
      <Link href="/vendormenu" passHref>
        <Button variant={pathname === '/vendormenu' ? 'primary' : 'outline-primary'}>
          Vendor Menu
        </Button>
      </Link>
    </>
  );
};

export default DashboardButtons;
