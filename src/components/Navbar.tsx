'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, Geo } from 'react-bootstrap-icons';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar bg="light" expand="lg" className="fw-bold">
      <Container className="position-relative">
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

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex nav-links-wrapper">
            {/* Home Link */}
            <Nav.Link href="/" className="colorlink">Home</Nav.Link>
            <Nav.Link href="/dashboard" className="colorlink">Dashboard</Nav.Link>
            <Nav.Link href="/planner" className="colorlink">Planner</Nav.Link>
            <Nav.Link href="/preferences" className="colorlink">Preferences</Nav.Link>

            {/* Links Dropdown */}
            <NavDropdown title="More" id="links-dropdown" className="colorlink custom-dropdown">
              <NavDropdown.Item href="/map" active={pathName === '/map'}>
                <Geo className="me-2 align-items-center" />
                Map
              </NavDropdown.Item>
              <NavDropdown.Item href="/vendors" active={pathName === '/vendors'}>
                Vendors List
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
          <Nav className="login-dropdown justify-content-end auth-buttons">
            {session ? (
              <NavDropdown id="login-dropdown" className="colorlink" title={currentUser}>
                <NavDropdown.Item
                  id="login-dropdown-sign-out"
                  href="/api/auth/signout"
                  className="login-button align-items-center"
                >
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="login-dropdown-change-password"
                  href="/auth/change-password"
                  className="login-button align-items-center"
                >
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <a href="/auth/signin" className="login-button">Login</a>
                <a href="/auth/signup" className="join-button">Join</a>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
