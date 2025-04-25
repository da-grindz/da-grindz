'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};

const GrindzForGainsGrid = ({ items }: { items: Item[] }) => (
  <Container className="py-4">
    <Container id="grindz-for-gains" className="p-4 mb-5">
      <Row className="text-center mb-4">
        <Col className="px-5">
          <h1>Grindz Mood - Grindz For Gains</h1>
          <p>
            Fuel your fitness goals with protein-packed meals from campus favorites.
            Whether you’re bulking, cutting, or just keeping it clean, these grindz deliver serious nutrition
            to help you power through your day and crush your workout.
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-3">
        <Col className="px-5">
          <h2>High-Protein Picks</h2>
          <p>
            Explore meals built for strength and stamina — loaded with lean proteins and balanced macros
            to support your active lifestyle.
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
            <Card.Body id="grindz-for-gains">
              <Card.Title>{item.source}</Card.Title>
              <Card.Text>{item.nutrition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default GrindzForGainsGrid;
