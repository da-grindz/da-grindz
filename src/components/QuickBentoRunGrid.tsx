'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};

const QuickBentoRunGrid = ({ items }: { items: Item[] }) => (
  <Container className="py-4">
    <Container id="quick-bento-run" className="p-4 mb-5">
      <Row className="text-center mb-4">
        <Col className="px-5">
          <h1>Grindz Mood - Quick Bento Run</h1>
          <p>
            Short on time but still want something ono? We’ve got you covered with quick, satisfying meals
            from across campus. Whether you’re in between classes or grabbing lunch on the go, these picks are
            fast, filling, and full of local flavor.
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-3">
        <Col className="px-5">
          <h2>Fast Favorites</h2>
          <p>Check out some of the top grab-and-go bento-style meals and local comfort foods you can find on campus.</p>
        </Col>
      </Row>
    </Container>

    <Row xs={1} sm={2} md={4} className="g-4">
      {items.map((item) => (
        <Col key={item.id}>
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={item.image}
              alt={item.alt}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Body id="quick-bento-run">
              <Card.Title>{item.source}</Card.Title>
              <Card.Text>{item.nutrition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default QuickBentoRunGrid;
