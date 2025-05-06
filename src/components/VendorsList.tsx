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

  console.log(`Current Day: ${day}, Current Time: ${currentTime}`); // Debugging

  // Parse hours string (e.g., "Mon-Thu: 6 am-10 pm, Fri: 6 am-5 pm")
  const hoursArray = hours.split(',').map((range) => range.trim());
  for (const range of hoursArray) {
    const [days, timeRange] = range.split(':').map((part) => part.trim());

    if (!timeRange) {
      // Skip if timeRange is undefined
      return false;
    }

    const [openTime, closeTime] = timeRange.split('-').map((time) => {
      const [hour, minute] = time.trim().split(/[: ]/).map(Number);
      const isPM = time.includes('pm');
      return (hour % 12) * 60 + (minute || 0) + (isPM ? 720 : 0);
    });

    console.log(`Days: ${days}, Open Time: ${openTime}, Close Time: ${closeTime}`); // Debugging

    // Map days to numeric values
    const dayMap: { [key: string]: number } = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    // Handle day ranges (e.g., "Mon-Thu")
    const dayParts = days.split('-').map((d) => d.trim());
    if (dayParts.length === 1) {
      // Single day (e.g., "Fri")
      if (dayMap[dayParts[0]] === day && currentTime >= openTime && currentTime < closeTime) {
        console.log(`Match Found: Single Day - ${days}`); // Debugging
        return true;
      }
    } else if (dayParts.length === 2) {
      // Day range (e.g., "Mon-Thu")
      const startDay = dayMap[dayParts[0]];
      const endDay = dayMap[dayParts[1]];
      if (
        day >= startDay
          && day <= endDay
          && currentTime >= openTime
          && currentTime < closeTime
      ) {
        console.log(`Match Found: Day Range - ${days}`); // Debugging
        return true;
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
