import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col>
          <h1>Welcome to Da Grindz</h1>
          <p>
            Overview of the website and its features.
          </p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
