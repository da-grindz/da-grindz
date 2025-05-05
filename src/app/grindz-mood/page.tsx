'use client';

import MiniMoodzGrid from '@/components/MiniMoodzGrid';
import { Container, Row, Col, Button } from 'react-bootstrap';

const grindzMood = () => {
  const MiniMoodzItemss = [
    {
      id: 1,
      image: 'https://free-images.com/lg/f005/salad_salad_plate_mixed.jpg',
      alt: 'Salad',
      title: 'Garden Salad',
    },
    {
      id: 2,
      image: 'https://free-images.com/lg/5f1a/bento_001.jpg',
      alt: 'Bento',
      title: 'Bento Box',
    },
    {
      id: 3,
      image: 'https://free-images.com/lg/77e5/barbecue_meat_barbecue_grill.jpg',
      alt: 'Protein',
      title: 'Grilled Chicken',
    },
  ];

  return (
    <Container id="grindz-page" fluid className="py-4">
      <Container id="grindz-block" className="py-4 px-2 mb-5">
        <Row className="align-middle text-center">
          <Col className="px-5">
            <h1>Grindz Mood</h1>
            <p>
              We totally get it! We all have our favorite foods.
              The
              <strong> Grindz Mood </strong>
              feature is designed to help you find the perfect meal to match your mood.
              It can be hard to tell where to go for your faves,
              so we’ve made it easy to find the perfect meals for your daily moods.
              Whether it’s a comforting bowl of ramen or a fresh salad,
              we’re here to help you find the perfect meals.
            </p>
            <p>
              Our goal is to make your dining experience as enjoyable and as simple as possible.
              You don&apos;t need to eat the same thing every day (there&apos;s nothing wrong with that!),
              but we can help you find new foods that are similar to your favorites!
            </p>
          </Col>
        </Row>
      </Container>

      <Container id="grindz-block" className="p-4 my-3">
        <Row id="mood-block" className="align-middle text-center p-4">
          <Col xs={12} md={12}>
            <h4>Vegetable Vibes</h4>
            <hr />
            <p>
              Craving something fresh and full of greens?
              Vegetable Vibes is all about delicious veggie-packed dishes!
              From crunchy, colorful salads to creamy soups and flavorful stir-fries,
              we’ve got you covered.
            </p>
            <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
            INSERT
          </Col>
        </Row>
      </Container>

      <Container id="grindz-block" className="p-4 my-3">
        <Row id="mood-block" className="align-middle text-center p-4">
          <Col xs={12} md={12}>
            <h4>Quick Bento Run</h4>
            <hr />
            <p>
              Always on the go?
              A quick bento run is the perfect solution for you!
              We offer a variety of bento boxes and grab-and-go meals that are both delicious and convenient.
              Perfect for busy days when you need something tasty and satisfying in a hurry!
            </p>
            <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
            <MiniMoodzGrid items={MiniMoodzItemss} />
          </Col>
        </Row>
      </Container>

      <Container id="grindz-block" className="p-4 my-3">
        <Row id="mood-block" className="align-middle text-center p-4">
          <Col xs={12} md={12}>
            <h4>Grindz For Gains</h4>
            <hr />
            <p>
              Training hard and need to refuel?
              Grindz for Gains is all about protein-packed meals that will help you recover and build muscle.
              From hearty grain bowls to protein-rich salads and wraps,
              we’ve got the perfect meals to help you crush your fitness goals.
            </p>
            <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
            INSERT
          </Col>
        </Row>
      </Container>

      <Container id="grindz-block" className="p-4 my-3">
        <Row id="mood-block" className="align-middle text-center p-4">
          <Col xs={12} md={12}>
            <h4>Satisfying Sips</h4>
            <hr />
            <p>
              Feeling thirsty?
              Satisfying Sips is here to quench your thirst with refreshing drinks!
              From smoothies and juices to iced teas and coffees,
              we’ve got the perfect beverages to keep you hydrated and energized.
            </p>
            <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
            INSERT
          </Col>
        </Row>
      </Container>

      <Container id="grindz-block" className="p-4 my-3">
        <Row id="mood-block" className="align-middle text-center p-4">
          <Col xs={12} md={12}>
            <h4>Sugar Rush</h4>
            <hr />
            <p>
              Looking for a sweet treat?
              Sugar Rush is here to satisfy your cravings!
              From decadent cakes and pastries to creamy ice creams and chocolates,
              we’ve got the perfect desserts to satisfy your sweet tooth.
            </p>
            <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
            INSERT
          </Col>
        </Row>
      </Container>

      <Container id="grindz-block" className="p-4 my-3">
        <Row id="" className="align-middle text-center p-4">
          <Col xs={12} md={12}>
            <h4>More Options Coming Soon!</h4>
            <hr />
            <p>
              We are always working to improve our Grindz Mood feature and add new options.
              If you have any suggestions or feedback, please let us know!
            </p>
            <p>
              Learn more about our team
              {' '}
              <a
                href="https://da-grindz.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default grindzMood;
