import { Col, Container, Row, Badge, Card } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';

type Vendor = {
  id: number;
  name: string;
  location: string;
  hours: string;
  phone: string;
  email: string | null;
//  type: string;
};

const isOpen = (hours: string) => {
  if (!hours) return false; // Return false if hours is undefined or empty

  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

  // Parse hours string (e.g., "Mon-Fri: 8 am-3 pm, Sat-Sun: 10:30 am-1:30 pm")
  const hoursArray = hours.split(',').map((range) => range.trim());
  for (const range of hoursArray) {
    const [days, timeRange] = range.split(':').map((part) => part.trim());

    if (timeRange) {
      const [openTime, closeTime] = timeRange.split('-').map((time) => {
        const [hour, minute] = time.trim().split(/[: ]/).map(Number);
        const isPM = time.includes('pm');
        return (hour % 12) * 60 + (minute || 0) + (isPM ? 720 : 0);
      });

      // Check if the current day matches and time is within range
      if (
        (days.includes('Mon') && day >= 1 && day <= 5)
        || (days.includes('Sat') && day === 6)
        || (days.includes('Sun') && day === 0)
      ) {
        if (currentTime >= openTime && currentTime < closeTime) {
          return true;
        }
      }
    }
  }
  return false;
};

const VendorsPage = async () => {
  // Fetch only the required fields from the database
  const vendors: Vendor[] = await prisma.eatery.findMany({
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
    <Container>
      {/* Banner */}
      <Container id="allergy-banner" className="p-4 mt-5 mb-5">
        <Row>
          <Col className="text-center px-5">
            <h1>Vendors Page</h1>
            <p>
              Here you can look at lists of vendors and their menus. You can also check if they are currently
              {' '}
              <Badge bg="success" className="me-2" style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>
                Open
              </Badge>
              {' '}
              or
              {' '}
              <Badge bg="danger" className="me-2" style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>
                Closed
              </Badge>
              !
            </p>
          </Col>
        </Row>
      </Container>

      {/* Vendor Cards */}
      <Container>
        <Row>
          {vendors.map((vendor) => {
            const status = isOpen(vendor.hours) ? 'Open' : 'Closed';

            return (
              <Col key={vendor.id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      {vendor.name}
                      <Badge
                        bg={status === 'Open' ? 'success' : 'danger'}
                        style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}
                      >
                        {status}
                      </Badge>
                    </Card.Title>
                    <Card.Text>
                      <strong>Location:</strong>
                      {' '}
                      {vendor.location}
                      <br />
                      <strong>Hours:</strong>
                      {' '}
                      {vendor.hours}
                      <br />
                      <strong>Phone:</strong>
                      {' '}
                      {vendor.phone}
                      <br />
                      <strong>Email:</strong>
                      {' '}
                      {vendor.email}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default VendorsPage;
