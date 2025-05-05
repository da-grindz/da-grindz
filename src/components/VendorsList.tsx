'use client';

import { Col, Container, Row, Badge, Card } from 'react-bootstrap';

type Vendor = {
  id: number;
  name: string;
  location: string;
  hours: string;
  phone: string;
  email: string | null;
};

const isOpen = (hours: string) => {
  if (!hours) return false;

  const now = new Date();
  const day = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const hoursArray = hours.split(',').map((range) => range.trim());
  for (const range of hoursArray) {
    const [days, timeRange] = range.split(':').map((part) => part.trim());

    if (timeRange) {
      const [openTime, closeTime] = timeRange.split('-').map((time) => {
        const [hour, minute] = time.trim().split(/[: ]/).map(Number);
        const isPM = time.includes('pm');
        return (hour % 12) * 60 + (minute || 0) + (isPM ? 720 : 0);
      });

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

const VendorsList = ({ vendors }: { vendors: Vendor[] }) => (
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
);

export default VendorsList;
