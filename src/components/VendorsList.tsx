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
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

  const hoursArray = hours.split(',').map((range) => range.trim());
  for (const range of hoursArray) {
    const [days, timeRange] = range.split(':').map((part) => part.trim());

    if (!timeRange) {
      return false; // Invalid format
    }

    const [openTime, closeTime] = timeRange.split('-').map((time) => {
      const [hour, minute] = time.trim().split(/[: ]/).map(Number);
      const isPM = time.includes('pm');
      return (hour % 12) * 60 + (minute || 0) + (isPM ? 720 : 0);
    });

    const dayMap: { [key: string]: number } = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const dayParts = days.split('-').map((d) => d.trim());
    if (dayParts.length === 1) {
      if (dayMap[dayParts[0]] === day && currentTime >= openTime && currentTime < closeTime) {
        return true;
      }
    } else if (dayParts.length === 2) {
      const startDay = dayMap[dayParts[0]];
      const endDay = dayMap[dayParts[1]];
      if (
        day >= startDay
        && day <= endDay
        && currentTime >= openTime
        && currentTime < closeTime
      ) {
        return true;
      }
    }
  }

  return false;
};

const VendorsList = ({ vendors }: { vendors: Vendor[] }) => {
  // Sort vendors by open status and alphabetically within each group
  const sortedVendors = [...vendors].sort((a, b) => {
    const aIsOpen = isOpen(a.hours);
    const bIsOpen = isOpen(b.hours);

    if (aIsOpen && bIsOpen) {
      // Both are open, sort alphabetically
      return a.name.localeCompare(b.name);
    } if (!aIsOpen && !bIsOpen) {
      // Both are closed, sort alphabetically
      return a.name.localeCompare(b.name);
    }
    // One is open and the other is closed, open comes first
    return aIsOpen ? -1 : 1;
  });

  return (
    <Container>
      <Row>
        {sortedVendors.map((vendor) => {
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
                    {vendor.email || 'N/A'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default VendorsList;
