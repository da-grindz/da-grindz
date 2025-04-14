'use client';

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};

const items: Item[] = [
  {
    id: 1,
    image:
    'https://globalassets.starbucks.com/digitalassets/products/food/'
    + 'EggPestoMozzarellaSandwich.jpg?impolicy=1by1_medium_630',
    alt: 'Egg, Pesto, and Mozzarella Sandwich from Starbucks',
    source: 'Starbucks - Egg, Pesto, and Mozzarella Sandwich',
    nutrition: 'Calories: 390 | Protein: 21g | Fat: 16g | Carbs: 36g',
  },
  {
    id: 2,
    image: 'https://tb-static.uber.com/prod/image-proc/processed_images/'
      + '20104fcef39781fc0cc069d42675e8f2/0fb376d1da56c05644450062d25c5c84.jpeg',
    alt: 'Greens n Ginger smoothie from Jamba Juice',
    source: 'Jamba Juice - Greens n Ginger',
    nutrition: 'Calories: 290 | Protein: 4g | Fat: 1g | Carbs: 70g',
  },
  {
    id: 3,
    image: 'https://subwayisfresh.com.sg/wp-content/uploads/2022/01/Menuitem-Veggie-Delite.jpg',
    alt: 'Veggie Delight from Subway',
    source: 'Subway - Veggie Delight',
    nutrition: 'Calories: 250 | Protein: 10g | Fat: 6g | Carbs: 39g',
  },
  {
    id: 4,
    image: 'https://i.redd.it/z8hy5fs8qx451.jpg',
    alt: 'Veggie Spring Rolls from Panda Express',
    source: 'Panda Express - Veggie Spring Rolls',
    nutrition: 'Calories: 296 | Protein: 7g | Fat: 12g | Carbs: 38g',
  },
];

const VegetarianItemsGrid = () => (
  <Row xs={1} sm={2} md={4} className="g-4">
    {items.map((item) => (
      <Col key={item.id}>
        <Card className="h-100">
          <Card.Img variant="top" style={{ height: '300px', objectFit: 'cover' }} src={item.image} alt={item.alt} />
          <Card.Body id="vegetarian-vibes-card-body">
            <Card.Title>{item.source}</Card.Title>
            <Card.Text>{item.nutrition}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default VegetarianItemsGrid;
