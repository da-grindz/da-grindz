'use client';

import { Col, Container, Row, Badge, Image } from 'react-bootstrap';

const vendors = [
  {
    name: 'Starbucks',
    hours: { open: '06:00', close: '20:00' },
    menu: ['Coffee', 'Tea', 'Pastries'],
    logo:
     'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/'
     + 'Starbucks_Corporation_Logo_2011.svg/1200px-'
     + 'Starbucks_Corporation_Logo_2011.svg.png',
  },
  {
    name: 'Jamba Juice',
    hours: { open: '08:00', close: '16:00' },
    menu: ['Smoothies', 'Juices', 'Energy Bowls'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Jamba_logo.svg/2560px-Jamba_logo.svg.png',
  },
  {
    name: 'Subway',
    hours: { open: '08:00', close: '18:00' },
    menu: ['Sandwiches', 'Salads', 'Cookies'],
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKKT2oLA7koPD2OqlCf4-pCRud413xuoalcw&s',
  },
  {
    name: 'Panda Express',
    hours: { open: '10:00', close: '16:30' },
    menu: ['Orange Chicken', 'Fried Rice', 'Spring Rolls'],
    logo: 'https://1000logos.net/wp-content/uploads/2024/01/Panda-Express-Logo.png',
  },
  {
    name: 'Holo Holo Bistro',
    hours: { open: '08:00', close: '15:00' },
    menu: ['Poke Bowls', 'Sushi', 'Ramen'],
    logo:
     '/holoholobistro_logo.png',
  },
  {
    name: 'L&L',
    hours: { open: '07:00', close: '16:30' },
    menu: ['Chicken Katsu', 'Loco Moco', 'Spam Musubi'],
    logo: '/L&L_logo.png',
  },
  {
    name: "B'rito Bowl",
    hours: { open: '10:00', close: '14:00' },
    menu: ['Burritos', 'Tacos', 'Quesadillas'],
    logo: 'https://manoa.hawaii.edu/studentlife/wp-content/uploads/BritoBowls_UniofHawaii.png',
  },
  {
    name: 'Campus Center Food Court',
    hours: { open: '07:00', close: '15:00' },
    menu: ['Pizza', 'Burgers', 'Fries'],
    logo:
    'https://manoa.hawaii.edu/studentlife/wp-content/uploads/brizy/imgs/'
    + 'food-court-216x145x0x0x216x144x1659491587.jpg',
  },
];

const isOpen = (hours: { open: string; close: string }) => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes
  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  // Check if the vendor is open on the current day
  if (day === 0 || day === 6) {
    // Assuming vendors are closed on weekends
    return false;
  }
  return currentTime >= openTime && currentTime < closeTime;
};

const VendorsPage = () => (
  <Container>
    {/* Banner */}
    <Container id="allergy-banner" className="p-4 mt-5 mb-5">
      <Row>
        <Col className="text-center px-5">
          <h1>Vendors Page</h1>
          <p>
            Here you can look at lists of vendors and their menus.
            {' '}
            You can also check if they are currently
            {' '}
            <Badge
              bg="success"
              className="me-2"
              style={{
                fontSize: '0.8rem',
                padding: '',
                verticalAlign: 'middle',
              }}
            >
              Open
            </Badge>
            or
            {' '}
            <Badge
              bg="danger"
              className="me-2"
              style={{
                fontSize: '0.8rem',
                padding: '',
                verticalAlign: 'middle',
              }}
            >
              Closed
            </Badge>
            !
          </p>
          {/* Improved Button Dropdown for Vendors */}
          <div className="text-center mb-4 pt-3">
            <div className="dropdown">
              <button
                className="btn landingbutton dropdown-toggle"
                id="vendorDropdown"
                aria-expanded="false"
                onClick={(e) => {
                  const dropdownMenu = e.currentTarget.nextElementSibling;
                  if (dropdownMenu) {
                    dropdownMenu.classList.toggle('show');
                  }
                }}
                type="button"
              >
                Jump to vendor
              </button>
              <ul
                className="dropdown-menu custom-dropdown-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                }}
                aria-labelledby="vendorDropdown"
              >
                {vendors.map((vendor) => (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        const vendorElement = document.getElementById(vendor.name);
                        if (vendorElement) {
                          vendorElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      type="button"
                    >
                      {vendor.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <Container id="allergy-form" className="p-4 mt-5 mb-5">
      <Container>
        {vendors.map((vendor) => {
          const status = isOpen(vendor.hours) ? 'Open' : 'Closed';

          return (
            <section key={vendor.name} id={vendor.name} style={{ marginBottom: '20px' }}>
              <h2 className="text-center d-flex justify-content-center align-items-center">
                <span>{vendor.name}</span>
                <Badge
                  bg={status === 'Open' ? 'success' : 'danger'}
                  className="ms-2"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.3em 0.5em',
                    verticalAlign: 'middle',
                  }}
                >
                  {status}
                </Badge>
              </h2>
              {/* Vendor Logo */}
              <div className="text-center">
                <Image
                  src={vendor.logo}
                  alt={`${vendor.name} logo`}
                  style={{ maxWidth: '150px', margin: '10px 0' }}
                />
              </div>
              <h4>Menu:</h4>
              <ul>
                {vendor.menu.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <hr />
            </section>
          );
        })}
      </Container>
    </Container>
  </Container>
);

export default VendorsPage;
