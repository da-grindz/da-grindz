'use client';

import MiniMoodzGrid from '@/components/MiniMoodzGrid';
import { Container, Row, Col, Button } from 'react-bootstrap';

const grindzMood = () => {
  const vegVibes = [
    {
      id: 1,
      image: 'https://globalassets.starbucks.com/digitalassets/products/food/'
      + 'EggPestoMozzarellaSandwich.jpg?impolicy=1by1_medium_630',
      alt: 'EggPestoMozzarellaSandwich',
      title: 'Starbucks',
      subtitle: 'Egg Pesto Mozzarella Sandwich',
    },
    {
      id: 2,
      image: 'https://tb-static.uber.com/prod/image-proc/processed_images/'
      + '20104fcef39781fc0cc069d42675e8f2/0fb376d1da56c05644450062d25c5c84.jpeg',
      alt: 'Greens n Ginger Smoothie',
      title: 'Jamba Juice',
      subtitle: 'Greens n Ginger Smoothie',
    },
  ];

  const bento = [
    {
      id: 1,
      image: 'https://s3-media0.fl.yelpcdn.com/bphoto/1IqjvZEaXYotY1C3LLlAbA/o.jpg',
      alt: 'Furikake Fish Plate from Campus Center Food Court',
      title: 'Campus Center Food Court',
      subtitle: 'Furikake Fish Plate',
    },
    {
      id: 2,
      image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,'
          + 'quality=90/media/photos/3c4531e7-48a9-4a8f-9269-b35c82d0c169-retina-large-jpeg',
      alt: 'BBQ Mix Plate from L&L',
      title: 'L&L',
      subtitle: 'BBQ Mix Plate',
    },
  ];

  const gains = [
    {
      id: 1,
      image: 'https://www.sabwaymenu.com/wp-content/uploads/2024/10/grilled-chicken-460-cals-670ca5953854e.webp',
      alt: 'Grilled Chicken Wrap from Subway',
      title: 'Subway',
      subtitle: 'Grilled Chicken Wrap',
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStEIUPt5aA-72zVIXhanUlwNbmSgW6_qbkA&s',
      alt: 'Grilled Teriyaki Chicken from Panda Express',
      title: 'Panda Express',
      subtitle: 'Grilled Teriyaki Chicken',
    },
  ];

  const sips = [
    {
      id: 1,
      image: 'https://www.theteashelf.com/cdn/shop/articles/Untitled_design_13_782x.jpg?v=1597849079',
      alt: 'Iced Matcha Tea Latte from Starbucks',
      title: 'Starbucks',
      subtitle: 'Iced Matcha Tea Latte',
    },
    {
      id: 2,
      image: 'https://tb-static.uber.com/prod/image-proc/processed_images/26442f12f17030'
          + '126de3721d6fb13253/0fb376d1da56c05644450062d25c5c84.jpeg',
      alt: 'Orange Dream Machine from Jamba Juice',
      title: 'Jamba Juice',
      subtitle: 'Orange Dream Machine',
    },
  ];

  const sugar = [
    {
      id: 1,
      image: 'https://mma.prnewswire.com/media/2287682/Subway_Restaurants_Chocolate_Cookie.jpg?w=2700',
      alt: 'Footlong Chocolate Chip Cookie from Subway',
      title: 'Subway',
      subtitle: 'Footlong Chocolate Chip Cookie',
    },
    {
      id: 2,
      image: 'https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.honolulumagazine.com/content/uploa'
          + 'ds/2021/01/Mochisada3.jpg',
      alt: 'Mochisadas from Quick Bites',
      title: 'Quick Bites',
      subtitle: 'Mochisadas',
    },
  ];

  return (
    <Container id="grindz-page" fluid className="py-4">
      <Container id="grindz-block" className="py-4 px-2 mb-5">
        <Row className="align-middle text-center">
          <Col className="px-5">
            <h1>Grindz Mood</h1>
            <p>
              We totally get it! We all have our favorite foods.
              The
              <strong> Grindz Mood </strong>
              feature is designed to help you find the perfect meal to match your mood.
              It can be hard to tell where to go for your faves,
              so we’ve made it easy to find the perfect meals for your daily moods.
              Whether it’s a comforting bowl of ramen or a fresh salad,
              we’re here to help you find the perfect meals.
            </p>
            <p>
              Our goal is to make your dining experience as enjoyable and as simple as possible.
              You don&apos;t need to eat the same thing every day (there&apos;s nothing wrong with that!),
              but we can help you find new foods that are similar to your favorites!
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-stretch">
          <Col xs={12} sm={12} md={6} className="d-flex">
            <Container id="grindz-block" className="p-4 my-3 equal-height-card">
              <Row className="align-middle text-center p-4">
                <Col xs={12} md={12}>
                  <h2>Vegetable Vibes</h2>
                  <hr />
                  <p>
                    Craving something fresh and full of greens?
                    Vegetable Vibes is all about delicious veggie-packed dishes!
                    From crunchy, colorful salads to creamy soups and flavorful stir-fries,
                    we’ve got you covered.
                    <br />
                    <br />
                  </p>
                  <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
                  <p>
                    Some popular options include:
                  </p>
                  <MiniMoodzGrid items={vegVibes} />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={12} sm={12} md={6} className="d-flex">
            <Container id="grindz-block" className="p-4 my-3 equal-height-card">
              <Row className="align-middle text-center p-4">
                <Col xs={12} md={12}>
                  <h2>Quick Bento Run</h2>
                  <hr />
                  <p>
                    Always on the go?
                    A quick bento run is the perfect solution for you!
                    We offer a variety of bento boxes and grab-and-go meals that are both delicious and convenient.
                    Perfect for busy days when you need something tasty and satisfying in a hurry!
                  </p>
                  <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
                  <p>
                    Some popular options include:
                  </p>
                  <MiniMoodzGrid items={bento} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-stretch">
          <Col xs={12} sm={12} md={6} className="d-flex">
            <Container id="grindz-block" className="p-4 my-3 equal-height-card">
              <Row className="align-middle text-center p-4">
                <Col xs={12} md={12}>
                  <h2>Grindz For Gains</h2>
                  <hr />
                  <p>
                    Training hard and need to refuel?
                    Grindz for Gains is all about protein-packed meals that will help you recover and build muscle.
                    From hearty grain bowls to protein-rich salads and wraps,
                    we’ve got the perfect meals to help you crush your fitness goals.
                  </p>
                  <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
                  <p>
                    Some popular options include:
                  </p>
                  <MiniMoodzGrid items={gains} />
                </Col>
              </Row>
            </Container>
          </Col>

          <Col>
            <Container id="grindz-block" className="p-4 my-3">
              <Row id="mood-block" className="align-middle text-center p-4 equal-height-card">
                <Col xs={12} md={12}>
                  <h2>Satisfying Sips</h2>
                  <hr />
                  <p>
                    Feeling thirsty?
                    Satisfying Sips is here to quench your thirst with refreshing drinks!
                    From smoothies and juices to iced teas and coffees,
                    we’ve got the perfect beverages to keep you hydrated and energized.
                  </p>
                  <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
                  <p>
                    Some popular options include:
                  </p>
                  <MiniMoodzGrid items={sips} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-stretch">
          <Col xs={12} sm={12} md={6} className="d-flex">
            <Container id="grindz-block" className="p-4 my-3">
              <Row id="mood-block" className="align-middle text-center p-4 equal-height-card">
                <Col xs={12} md={12}>
                  <h2>Sugar Rush</h2>
                  <hr />
                  <p>
                    Looking for a sweet treat?
                    Sugar Rush is here to satisfy your cravings!
                    From decadent cakes and pastries to creamy ice creams and chocolates,
                    we’ve got the perfect desserts to satisfy your sweet tooth.
                  </p>
                  <Button onClick={() => window.location.href = '/preferences'} className="me-3">Choose Me!</Button>
                  <p>
                    Some popular options include:
                  </p>
                  <MiniMoodzGrid items={sugar} />
                </Col>
              </Row>
            </Container>
          </Col>

          <Col>
            <Container id="grindz-block" className="p-4 my-3">
              <Row id="" className="align-middle text-center p-4">
                <Col xs={12} md={12}>
                  <h2>More Options Coming Soon!</h2>
                  <hr />
                  <p>
                    We are always working to improve our Grindz Mood feature and add new options.
                    If you have any suggestions or feedback, please let us know!
                  </p>
                  <p>
                    Learn more about our team
                    {' '}
                    <a
                      href="https://da-grindz.github.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    .
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default grindzMood;
