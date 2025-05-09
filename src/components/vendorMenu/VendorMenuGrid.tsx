'use client';

import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import Link from 'next/link';

type Item = {
  id: number;
  image: string;
  alt: string;
  name: string;
  calories: number;
  description: string;
  price: number;
};

const VendorMenuGrid = ({ items }: { items: Item[] }) => (
  <Container className="py-4">
    {items.length === 0 ? (
      <div className="text-center py-5">
        <h3>This vendor contains no menu items.</h3>
      </div>
    ) : (
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
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Price:
                  {' '}
                  $
                  {item.price.toFixed(2)}
                </Card.Text>
                <Card.Text>
                  Calories:
                  {' '}
                  {item.calories}
                </Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Link href={`/edit-item/${item.id}`} passHref>
                  <Button variant="primary">Edit</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
  </Container>
);

export default VendorMenuGrid;
