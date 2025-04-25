'use client';

import { Col, Container, Row, Image } from 'react-bootstrap';
import { GiPeanut, GiWheat, GiSesame, GiMilkCarton } from 'react-icons/gi';
import { FaSeedling, FaFish, FaBreadSlice } from 'react-icons/fa';
import { TbBottleFilled } from 'react-icons/tb';
import { FaShrimp } from 'react-icons/fa6';

/** The Allergy page. */
const AllergyPage = () => (
  <Container id="allergy-page" fluid className="mt-4 py-3">
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
      <Row className="align-middle text-center">
        <Col className="text-center px-5">
          <p>
            Please take a moment to review the list of common allergens below.
            If you have any allergies, please let us know by filling out the form.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center text-center">
        <Col xs={2}>
          <div>
            <GiPeanut size={32} />
            <p>Peanuts</p>
          </div>
          <div>
            <FaSeedling size={32} />
            <p>Tree Nuts</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <GiMilkCarton size={32} />
            <p>Milk</p>
          </div>
          <div>
            <FaFish size={32} />
            <p>Fish</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <FaShrimp size={32} />
            <p>Shellfish</p>
          </div>
          <div>
            <GiWheat size={32} />
            <p>Wheat</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <FaBreadSlice size={32} />
            <p>Gluten</p>
          </div>
          <div>
            <GiSesame size={32} />
            <p>Sesame</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <TbBottleFilled size={32} />
            <p>Mustard</p>
          </div>
        </Col>
      </Row>
    </Container>
    <Container id="allergy-form" className="p-4 mt-5">
      <Row className="align-middle text-center">
        <Col className="text-center px-5">
          <h1>Allergy Form</h1>
          <p>
            Please fill out the form below to let us know about your allergies.
            This information will help us provide you with safe and suitable meal options.
          </p>
        </Col>
      </Row>
      <Row className="align-middle text-center">
        <a href="/preferences">
          <Image
            src="/preferences-editor.png"
            className="img-fluid py-3"
          />
        </a>
      </Row>
    </Container>
  </Container>
);

export default AllergyPage;
