import { Col, Container, Row, Button } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main className="home-page">
    <Container id="landing-page" fluid className="py-5">
      <Container className="landingcontainer">
        <Row className="align-middle text-center">
          <Col>
            <h1>Welcome to Da Grindz</h1>
          </Col>
        </Row>
        <Container className="py-3">
          <Row className="align-middle text-center">
            <Col>
              <p>
                Da Grindz is a nutrition-focused web application designed for the students and staff of UH Mānoa.
                It combines local campus dining information with personalized meal planning and nutritional tracking
                to support healthier eating habits and more mindful food choices.
              </p>
            </Col>
          </Row>
          <Row className="align-middle text-center">
            <Col>
              <Button href="#getstarted" className="mx-2 landingbutton">Get Started</Button>
              <Button href="/auth/signin" className="mx-2 landingbutton">Log In</Button>
              <Button href="/dashboard" className="mx-2 landingbutton">Dashboard</Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="py-3 landingcontainer">
        <Row className="align-middle">
          <Col>
            <h3 className="text-center">Key Features</h3>
            <ul>
              <li>
                Personalized meal recommendations based on allergies, dietary preferences, and nutritional goals.
              </li>
              <li>
                Real-time listings and map locations of on-campus food vendors.
              </li>
              <li>
                Calendar-based meal planning based on current and future menus.
              </li>
              <li>
                Nutritional intake tracking with progress suggestions.
              </li>
              <li>UH Mānoa-focused experience including local dishes, events, and promotions from vendors.</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container className="pt-3 pb-5 landingcontainer">
        <Row className="align-middle text-center">
          <Col>
            <h3 id="getstarted">Lets Get Started!</h3>
            <p>
              To get started, please sign up and create an account.
            </p>
            <Button href="/auth/signup" className="mx-2 landingbutton">Sign Up</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
