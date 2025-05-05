'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};

const SatisfyingSipsGrid = ({ items }: { items: Item[] }) => (
  <Container className="py-4">
    <Container id="satisfying-sips" className="p-4 mb-5">
      <Row className="text-center mb-4">
        <Col className="px-5">
          <h1>Grindz Mood - Satisfying Sips</h1>
          <p>
            Need a refreshing pick-me-up? Whether you’re into smoothies, teas, or something sweet and icy, these campus
            favorites will hit the spot!
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-3">
        <Col className="px-5">
          <h2>Available Drink Favorites</h2>
          <p>
            Quench your thirst with these go-to beverages—perfect for powering through
            your day or just taking a tasty break.
          </p>
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
            <Card.Body id="satisfying-sips">
              <Card.Title>{item.source}</Card.Title>
              <Card.Text>{item.nutrition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default SatisfyingSipsGrid;
