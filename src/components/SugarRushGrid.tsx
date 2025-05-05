'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};

const SugarRushGrid = ({ items }: { items: Item[] }) => (
  <Container className="py-4">
    <Container id="sugar-rush" className="p-4 mb-5">
      <Row className="text-center mb-4">
        <Col className="px-5">
          <h1>Grindz Mood - Sugar Rush</h1>
          <p>
            Craving something sweet? From rich pastries to chewy cookies, you’ll find
            a variety of desserts all across campus to satisfy your sweet tooth.
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-3">
        <Col className="px-5">
          <h2>Available Sweet Treats</h2>
          <p>
            Discover student favorites that hit the spot! These indulgent picks are always a crowd-pleaser on campus.
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
            <Card.Body id="sugar-rush">
              <Card.Title>{item.source}</Card.Title>
              <Card.Text>{item.nutrition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default SugarRushGrid;
