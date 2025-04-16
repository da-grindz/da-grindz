/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link href="/" className="d-flex align-items-center text-decoration-none">
            Da-Grindz
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={pathname === '/'}>Home</Nav.Link>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link active={pathname === '/about'}>About</Nav.Link>
            </Link>
            <NavDropdown title="Links" id="links-dropdown">
              <Link href="/links/map" passHref legacyBehavior>
                <NavDropdown.Item>Map</NavDropdown.Item>
              </Link>
              <Link href="/links/calendar" passHref legacyBehavior>
                <NavDropdown.Item>Calendar</NavDropdown.Item>
              </Link>
              <Link href="/links/personaltracking" passHref legacyBehavior>
                <NavDropdown.Item>Personal Tracking</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Link href="/contact" passHref legacyBehavior>
              <Nav.Link active={pathname === '/contact'}>Contact</Nav.Link>
            </Link>
          </Nav>
          <Link href="/login" passHref legacyBehavior>
            <Button variant="outline-primary">Log In</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
