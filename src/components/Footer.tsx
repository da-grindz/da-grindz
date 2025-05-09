import { Col, Container } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

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
        <Github size={25} className="mx-1" />
        <a className="mx-1" href="https://da-grindz.github.io/">https://da-grindz.github.io/</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
