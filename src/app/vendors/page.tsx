'use client';

import { Col, Container, Row, Image } from 'react-bootstrap';

const vendors = [
  {
    name: 'Starbucks',
    menu: ['Coffee', 'Tea', 'Pastries'],
    logo:
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/'
      + 'Starbucks_Corporation_Logo_2011.svg/1200px-'
      + 'Starbucks_Corporation_Logo_2011.svg.png',
  },
  {
    name: 'Jamba Juice',
    menu: ['Smoothies', 'Juices', 'Energy Bowls'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Jamba_logo.svg/2560px-Jamba_logo.svg.png',
  },
  {
    name: 'Subway',
    menu: ['Sandwiches', 'Salads', 'Cookies'],
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKKT2oLA7koPD2OqlCf4-pCRud413xuoalcw&s',
  },
  {
    name: 'Panda Express',
    menu: ['Orange Chicken', 'Fried Rice', 'Spring Rolls'],
    logo: 'https://1000logos.net/wp-content/uploads/2024/01/Panda-Express-Logo.png',
  },
  {
    name: 'Holo Holo Bistro',
    menu: ['Poke Bowls', 'Sushi', 'Ramen'],
    logo:
      '/holoholobistro_logo.png',
  },
  {
    name: 'L&L',
    menu: ['Chicken Katsu', 'Loco Moco', 'Spam Musubi'],
    logo: '/L&L_logo.png',
  },
  {
    name: "B'rito Bowl",
    menu: ['Burritos', 'Tacos', 'Quesadillas'],
    logo: 'https://manoa.hawaii.edu/studentlife/wp-content/uploads/BritoBowls_UniofHawaii.png',
  },
  {
    name: 'Campus Center Food Court',
    menu: ['Pizza', 'Burgers', 'Fries'],
    logo:
     'https://manoa.hawaii.edu/studentlife/wp-content/uploads/brizy/imgs/'
     + 'food-court-216x145x0x0x216x144x1659491587.jpg',
  },
];

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
        {vendors.map((vendor) => (
          <section key={vendor.name} style={{ marginBottom: '20px' }}>
            <h2 className="text-center">
              {vendor.name}
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
        ))}
      </Container>
    </Container>
  </Container>
);

export default VendorsPage;
