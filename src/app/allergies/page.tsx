'use client';

import { Col, Container, Row } from 'react-bootstrap';

/** The Allergy page. */
const Allergy = () => (
  <main>
    <Container id="allergy-page" fluid className="py-3">
      <Container id="allergy-banner" className="p-4">
        <Row className="align-middle text-center">
          <Col className="text-center px-5">
            <h1>What are you allergic to?</h1>
            <p>
              Here at UH Manoa, we offer a lot of different types of food. Let us know what dietary restrictions
              you have so that we can help you stay safe!
              Your health and well-being are our top priorities.
              By sharing your allergies or dietary preferences,
              we can ensure that you have access to meals that suit your needs and provide a
              worry-free dining experience.
            </p>
          </Col>
        </Row>
      </Container>

    </Container>
  </main>
);

export default Allergy;
