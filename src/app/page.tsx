import { Col, Container, Row, Button, Image } from 'react-bootstrap';
import { CaretRight } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main className="home-page">
    {/* Welcome Section */}
    <Container id="welcome">
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
                <Button href="#getstarted" className="cool-button" variant="none">Lets Get Started!</Button>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className="py-3 landingcontainer">
          <Row className="align-middle">
            <Col>
              <h2 className="text-center">Key Features</h2>
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
      </Container>
    </Container>

    {/* User Guide Section */}
    <Container id="landing-page" fluid className="py-5">
      <Container className="pt-3 pb-5 landingcontainer">
        <Row className="align-middle text-center">
          <Col>
            <h1 id="getstarted">Lets Get Started!</h1>

            <br />
            <Container>
              <p className="pr-3">
                <CaretRight size={25} className="mx-2" />
                To get started, please sign up and create an account, or login if you already have an account.
              </p>
              <Button href="/auth/signup" className="mx-2 landingbutton" variant="none">Sign Up</Button>
              <Button href="/auth/signin" className="mx-2 landingbutton" variant="none">Login</Button>
            </Container>
            <Container className="pt-5">
              <p className="pr-3">
                <CaretRight size={25} className="mx-2" />
                Then fill out your preferences for allergies and Grindz Mood:
              </p>
              <Button href="/allergies" className="mx-2 landingbutton" variant="none">Allergies</Button>
              <Image
                src="/allergiespage.png"
                sizes="(100vw)"
                className="img-fluid landingimage"
              />
              <Button href="/grindz-mood" className="mx-2 landingbutton" variant="none">Grindz Mood</Button>
              <Image
                src="/grindzmoodpage.png"
                sizes="(100vw)"
                className="img-fluid landingimage"
              />
            </Container>
            <Container className="pt-5">
              <p className="pr-3">
                <CaretRight size={25} className="mx-2" />
                Now go to your dashboard.
              </p>
              <Button href="/dashboard" className="mx-2 landingbutton" variant="none">Dashboard</Button>
              <Image
                src="/dashboardpage.png"
                sizes="(100vw)"
                className="img-fluid landingimage"
              />
            </Container>
            <Container className="pt-5">
              <p className="pr-3">
                <CaretRight size={25} className="mx-2" />
                Now you can start filling out your planner
                and looking at the list of vendors and their menus!
              </p>
              <Button href="/planner" className="mx-2 landingbutton" variant="none">Planner</Button>
              <Image
                src="/plannerpage.png"
                sizes="(100vw)"
                className="img-fluid landingimage"
              />
              <Button href="/vendors" className="mx-2 landingbutton" variant="none">Vendors List</Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
