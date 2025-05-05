'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};

const VegetarianVibesGrid = ({ items }: { items: Item[] }) => (
  <Container className="py-4">
    <Container id="vegetarian-vibes" className="p-4 mb-5">
      <Row className="text-center mb-4">
        <Col className="px-5">
          <h1>Grindz Mood - Vegetarian Vibes</h1>
          <p>
            Discover a variety of vegetarian meal options across campus vendors.
            Whether you&apos;re eating for health, the environment, or personal choice,
            we&apos;re here to support your lifestyle with delicious and nutritious food.
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-3">
        <Col className="px-5">
          <h2>Available Vegetarian Items</h2>
          <p>Explore some of the top vegetarian picks available from our campus dining partners.</p>
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
            <Card.Body id="vegetarian-vibes">
              <Card.Title>{item.source}</Card.Title>
              <Card.Text>{item.nutrition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default VegetarianVibesGrid;
