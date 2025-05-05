'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
};

const MiniMoodzGrid = ({ items }: { items: Item[] }) => (
  <Container id="mini-moodz" className="justify-content-center py-4">
    <Row xs={1} sm={1} md={2} className="g-2">
      {items.map((item) => (
        <Col key={item.id}>
          <Card id="mini-moodz" className="h-100">
            <Card.Img
              variant="top"
              src={item.image}
              alt={item.alt}
              style={{ height: '250px', objectFit: 'cover' }} // Smaller image size
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <hr id="break" />
              <Card.Subtitle>{item.subtitle}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default MiniMoodzGrid;
