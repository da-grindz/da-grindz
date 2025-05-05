'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  title: string;
};

const MiniMoodzGrid = ({ items }: { items: Item[] }) => (
  <Container id="mini-moodz" className="justify-content-center py-4">
    <Row xs={1} sm={2} md={4} className="g-3">
      {items.map((item) => (
        <Col key={item.id}>
          <Card id="mini-moodz" className="h-100">
            <Card.Img
              variant="top"
              src={item.image}
              alt={item.alt}
              style={{ height: '150px', objectFit: 'cover' }} // Smaller image size
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default MiniMoodzGrid;
