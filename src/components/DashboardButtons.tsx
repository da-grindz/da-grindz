'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Col, Row } from 'react-bootstrap';

const DashboardButtons = () => {
  const pathname = usePathname();
  const router = useRouter(); // We'll use this to refresh the page after randomizing the mood.

  // Function to handle mood randomization
  const handleRandomizeMood = async () => {
    console.log('Button clicked!');
    try {
      const res = await fetch('/api/randomize-mood', { method: 'POST' });
      if (res.ok) {
        // Refresh the page to show the new mood
        router.refresh();
      } else {
        console.error('Failed to randomize mood');
      }
    } catch (error) {
      console.error('Error randomizing mood:', error);
    }
  };

  return (
    <>
      <Link href="/planner" passHref>
        <Button variant={pathname === '/planner' ? 'success' : 'outline-success'} className="me-3">
          Planner
        </Button>
      </Link>
      <Link href="/preferences" passHref>
        <Button variant={pathname === '/preferences' ? 'success' : 'outline-success'} className="me-3">
          Preferences
        </Button>
      </Link>
      <Link href="/vendors" passHref>
        <Button variant={pathname === '/vendors' ? 'success' : 'outline-success'}>
          Vendor Menu
        </Button>
      </Link>

      <Row className="text-center mt-5">
        <Col>
          <p>
            Not sure what you&apos;re in the mood for? Click below and we’ll surprise you!
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-5">
        <Col>
          <Button variant="success" onClick={handleRandomizeMood}>
            🎲 Randomize Mood
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DashboardButtons;
