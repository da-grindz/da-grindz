'use client';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const grindzMood = () => (
  <Container id="grindz-page" fluid className="py-4">
    <Container id="grindz-block" className="py-4 px-2 mb-4">
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

    <Container id="grindz-block" className="p-4">
      <Row id="mood-block" className="align-middle text-center p-4 mb-4">
        <Col xs={12} md={6}>
          <h4>Vegetable Vibes</h4>
          <hr />
          <p>
            Craving something fresh and full of greens?
            Vegetable Vibes is all about delicious veggie-packed dishes!
            From crunchy, colorful salads to creamy soups and flavorful stir-fries,
            we’ve got you covered.
          </p>
          <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
          <h6>Here are some popular options!</h6>
          <ul className="text-start">
            <li>Garden Salad - HALE ALOHA</li>
            <li>Weekly Salads - CAMPUS CENTER</li>
            <li>Mix-Plate - PANDA EXPRESS</li>
          </ul>
        </Col>
        <Col xs={12} md={6}>
          <Image
            src="https://free-images.com/lg/f005/salad_salad_plate_mixed.jpg"
            alt="Vegetable"
            width={600}
            height={400}
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row id="mood-block" className="align-middle text-center p-4 mb-4">
        <Col xs={12} md={6}>
          <Image
            src="https://free-images.com/lg/5f1a/bento_001.jpg"
            alt="Bento"
            width={600}
            height={400}
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={6}>
          <h4>Quick Bento Run</h4>
          <hr />
          <p>
            Always on the go?
            A quick bento run is the perfect solution for you!
            We offer a variety of bento boxes and grab-and-go meals that are both delicious and convenient.
            Perfect for busy days when you need something tasty and satisfying in a hurry!
          </p>
          <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
          <h6>Here are some popular options!</h6>
          <ul className="text-start">
            <li>Misc Bentos - CAMPUS CENTER</li>
            <li>Misc Bentos & Musubis- HOLOHOLO BISTRO</li>
            <li>Mini Plates - L&L</li>
          </ul>
        </Col>
      </Row>
      <Row id="mood-block" className="align-middle text-center p-4 mb-4">
        <Col xs={12} md={6}>
          <h4>Grindz For Gains</h4>
          <hr />
          <p>
            Training hard and need to refuel?
            Grindz for Gains is all about protein-packed meals that will help you recover and build muscle.
            From hearty grain bowls to protein-rich salads and wraps,
            we’ve got the perfect meals to help you crush your fitness goals.
          </p>
          <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
          <h6>Here are some popular options!</h6>
          <ul className="text-start">
            <li>Burgers & Tenders - THE BURGER SHOP</li>
            <li>Simple Servings - HALE ALOHA</li>
            <li>Chicken Katsu - L&L</li>
            <li>Teriyaki Chicken - PANDA EXPRESS</li>
          </ul>
        </Col>
        <Col xs={12} md={6}>
          <Image
            src="https://free-images.com/lg/77e5/barbecue_meat_barbecue_grill.jpg"
            alt="Protein"
            width={600}
            height={400}
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row id="mood-block" className="align-middle text-center p-4">
        <Col xs={12} md={12}>
          <h4>More Options Coming Soon!</h4>
          <hr />
          <p>
            We are always working to improve our Grindz Mood feature and add new options.
            If you have any suggestions or feedback, please let us know!
          </p>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default grindzMood;
