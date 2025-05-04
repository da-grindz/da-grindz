'use client';

import { Col, Container, Row, Badge } from 'react-bootstrap';

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
    logo: 'https://play-lh.googleusercontent.com/z9Uwiol7PLYIRII-TdhOCnZ7CgM3wHNhYa3EagYUP5bJ8ky1AseBtDBe5Brn95rXgJ0',
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
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday

  // Closed all day on Saturday (6) and Sunday (0)
  if (day === 0 || day === 6) {
    return 'Closed All Day';
  }

  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes
  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  // Handle overnight hours (e.g., open at 10 PM, close at 6 AM)
  if (closeTime < openTime) {
    if (day === 1 && currentTime < closeTime) {
      // If it's early Sunday morning and the vendor closed after midnight
      return 'Closed All Day';
    }
    return currentTime >= openTime || currentTime < closeTime ? 'Open' : 'Closed';
  }

  return currentTime >= openTime && currentTime < closeTime ? 'Open' : 'Closed';
};

const VendorsPage = () => (
  <Container>
    {/* Banner */}
    <Container id="allergy-banner" className="p-4 mt-5 mb-5">
      <Row>
        <Col className="text-center px-5">
          <h1>Vendors Page</h1>
          <p>
            Look at lists of vendors and their menus. You can also check if they are currently opened or closed!
          </p>
        </Col>
      </Row>
    </Container>
    <Container id="allergy-banner" className="p-4 mt-5 mb-5">
      <Container>
        {vendors.map((vendor) => {
          const status = isOpen(vendor.hours) ? 'Open' : 'Closed';

          return (
            <section key={vendor.name} style={{ marginBottom: '20px' }}>
              <h2 className="text-center">
                {vendor.name}
                {' '}
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
                <img
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
