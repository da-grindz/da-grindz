import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Da Grindz Project
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
        <a href="https://da-grindz.github.io/">https://da-grindz.github.io/</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
