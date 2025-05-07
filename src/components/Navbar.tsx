/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar bg="light" expand="lg" className="fw-bold">
      <Container className="position-relative mr-1">
        {/* Logo & Brand */}
        <Navbar.Brand href="/" className="d-flex align-items-center justify-content-start">
        <Image
          src="/bone-apple-teeth.jpg"
          alt="Logo"
          width={30}
          height={30}
          className="me-2 rounded-circle"
          style={{ height: 'auto' }}
          priority
        />
          Da Grindz
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex nav-links-wrapper">
            {/* Home Link */}
            <Nav.Link href="/" className="colorlink">Home</Nav.Link>
            <Nav.Link href="/dashboard" className="colorlink">Dashboard</Nav.Link>
            <Nav.Link href="/planner" className="colorlink">Planner</Nav.Link>
            <Nav.Link href="/preferences" className="colorlink">Preferences</Nav.Link>

            {/* Links Dropdown */}
            <NavDropdown title="More" id="links-dropdown" className="colorlink">
              <NavDropdown.Item href="/vendors" active={pathName === '/vendors'}>
                Vendors List
              </NavDropdown.Item>
              <NavDropdown.Item href="/map" active={pathName === '/map'}>
                Map
              </NavDropdown.Item>
              <NavDropdown.Item href="/grindz-mood" active={pathName === '/grindz-mood'}>
                What&apos;s Your Grindz Mood?
              </NavDropdown.Item>
              <NavDropdown.Item href="/allergies" active={pathName === '/allergies'}>
                Got Allergies?
              </NavDropdown.Item>
            </NavDropdown>

            {/* Conditional Auth Links */}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* Sign In / Sign Out */}
          <Nav className="justify-content-end colorlink">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
