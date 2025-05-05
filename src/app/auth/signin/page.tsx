'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, CardHeader, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/dashboard', // Redirect to the dashboard after sign in
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <main id="signin-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <Card>
              <CardHeader>
                <h1 className="text-center pt-2">Sign In</h1>
                <h4 className="text-center">Welcome back!</h4>
              </CardHeader>
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input name="email" type="text" className="form-control" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control" />
                  </Form.Group>
                  <Button type="submit" className="mt-3">
                    Sign in
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Row className="justify-content-center">
                  <Col xs={6}>
                    Don&apos;t have an account?
                  </Col>
                  <Col xs={6} className="text-end">
                    <a href="/auth/signup">Sign up!</a>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
