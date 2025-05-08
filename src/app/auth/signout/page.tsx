'use client';

import { signOut } from 'next-auth/react';
import { Container, Button, Col, Row } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Container id="signout-page" className="text-center">
    <Container id="login" className="mt-3">
      <h1 className="py-5">Do you want to sign out?</h1>
      <Row>
        <Col xs={2} />
        <Col>
          <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            Sign Out
          </Button>
        </Col>
        <Col>
          <Button href="/">
            Cancel
          </Button>
        </Col>
        <Col xs={2} />
      </Row>
    </Container>
  </Container>
);

export default SignOut;
