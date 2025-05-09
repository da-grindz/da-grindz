import { prisma } from '@/lib/prisma';
import VendorsClient from '@/components/VendorsClient';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const VendorsPage = async () => {
  // Fetch only the required fields from the database
  const vendors = await prisma.eatery.findMany({
    where: {
      type: {
        in: ['RETAIL_DINING', 'RESIDENTIAL_DINING', 'FOOD_TRUCK'],
      },
    },
    select: {
      id: true,
      name: true,
      location: true,
      hours: true,
      phone: true,
      email: true,
    },
  });

  return (
    <Container fluid className="py-3">
      {/* Banner */}
      <Container id="" className="p-4 mt-5 mb-3 vendorspagebanner">
        <Row>
          <Col className="text-center px-5">
            <h1>Vendors List</h1>
            <p>
              Here you can look at lists of vendors and their menus.
              <br />
              You can also check if they are currently
              {' '}
              <Badge
                bg="success"
                /* id="badgegreen" */
                className="rounded-pill"
                style={{ fontSize: '0.6rem', verticalAlign: 'middle' }}
              >
                Open
              </Badge>
              {' '}
              or
              {' '}
              <Badge
                bg="danger"
                /* id="badgered" */
                className="rounded-pill me-1"
                style={{ fontSize: '0.6rem', verticalAlign: 'middle' }}
              >
                Closed
              </Badge>
              !
            </p>
          </Col>
        </Row>
      </Container>

      {/* Render Vendors List */}
      <VendorsClient vendors={vendors} />
    </Container>
  );
};

export default VendorsPage;
