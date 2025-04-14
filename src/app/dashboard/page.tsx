'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import VegetarianVibesDash from '@/components/VegetarianVibesDash';

const DashboardPage = () => (
  <Container id="dashboard-page" fluid className="py-3">
    {/* Dashboard Banner */}
    <Container id="dashboard-banner" className="p-4">
      <Row className="align-middle text-center">
        <Col className="px-5">
          <h1>Grindz Mood - Vegetarian Vibes</h1>
          <p>
            Discover a variety of vegetarian meal options across campus vendors.
            Whether you&apos;re eating for health, the environment, or personal choice,
            we&apos;re here to support your lifestyle with delicious and nutritious food.
          </p>
        </Col>
      </Row>
    </Container>

    {/* Button Section */}
    <Container className="p-4">
      <Row className="mb-4 justify-content-center text-center">
        <Col xs="auto">
          <Button variant="primary" className="me-3">Planner</Button>
          <Button variant="primary" className="me-3">Preferences</Button>
          <Button variant="primary">Vendor Menu</Button>
        </Col>
      </Row>
    </Container>

    {/* Grid Section */}
    <Container id="vegetarian-grid" className="p-4">
      <Row className="align-middle text-center">
        <Col className="px-5">
          <h2>Available Vegetarian Items</h2>
          <p>Explore some of the top vegetarian picks available from our campus dining partners.</p>
        </Col>
      </Row>
      <VegetarianVibesDash />
    </Container>
  </Container>
);

export default DashboardPage;
