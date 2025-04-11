'use client';

import { Col, Container, Image, Row } from 'react-bootstrap';

/** The Allergy page. */
const Allergy = () => (
  <main>
    <Container id="allergy-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image src="next.svg" width="150px" alt="" />
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to this template</h1>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Allergy;
// This is a placeholder for the allergy page.
