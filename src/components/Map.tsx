/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngBounds, divIcon } from 'leaflet';
import { Eatery, VendingMachine } from '@prisma/client';
import { IoFastFood } from 'react-icons/io5';
import { GrVend } from 'react-icons/gr';
import { renderToStaticMarkup } from 'react-dom/server';

const center: LatLngExpression = [21.299, -157.816];
const bounds: LatLngBounds = new LatLngBounds([21.289, -157.824], [21.309, -157.808]);

const eateryIcon = divIcon({
  html: renderToStaticMarkup(
    <div
      style={{
        backgroundColor: 'seashell',
        borderRadius: '40%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
      }}
    >
      <IoFastFood size={18} color="darkred" />
    </div>,
  ),
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const vendingMachineIcon = divIcon({
  html: renderToStaticMarkup(
    <div
      style={{
        backgroundColor: 'seashell',
        borderRadius: '40%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
      }}
    >
      <GrVend size={18} color="darkblue" />
    </div>,
  ),
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

type Props = {
  eateries: Eatery[];
  vendingMachines: VendingMachine[];
};

const eateryType: Record<string, string> = {
  RETAIL_DINING: 'Retail Dining',
  RESIDENTIAL_DINING: 'Residential Dining',
  FOOD_TRUCK: 'Food Truck',
};

const eaterySubtype: Record<string, string> = {
  MEAL_POINTS_ACCEPTED: 'Meal Points Accepted',
  MEAL_POINTS_NOT_ACCEPTED: 'Meal Points Not Accepted',
};

const vmType: Record<string, string> = {
  SNACK: 'Snack',
  BEVERAGE: 'Beverage',
};

const Map = ({ eateries, vendingMachines }: Props) => (
  <MapContainer center={center} zoom={16} scrollWheelZoom style={{ height: '100%' }} maxBounds={bounds}>
    <TileLayer
      minZoom={16}
      maxZoom={21}
      attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    />

    {eateries.map((eatery) => (
      <Marker key={`eatery-${eatery.id}`} position={[eatery.y, eatery.x]} icon={eateryIcon}>
        <Popup>
          <Container>
            <Row className="my-3">
              <Col>
                <strong style={{ fontSize: '18px' }}>{eatery.name}</strong>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Type:</strong>
              </Col>
              <Col>{eateryType[eatery.type]}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Subtype:</strong>
              </Col>
              <Col>{eaterySubtype[eatery.subtype]}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Location:</strong>
              </Col>
              <Col>{eatery.location}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Room:</strong>
              </Col>
              <Col>{eatery.room ?? 'N/A'}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Floor:</strong>
              </Col>
              <Col>{eatery.floor}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Hours:</strong>
              </Col>
              <Col>{eatery.hours}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Phone:</strong>
              </Col>
              <Col>{eatery.phone}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Email:</strong>
              </Col>
              <Col>{eatery.email ?? 'N/A'}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Website:</strong>
              </Col>
              <Col>
                <a href={eatery.website} target="_blank" rel="noopener noreferrer">
                  {eatery.website}
                </a>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Notes:</strong>
              </Col>
              <Col>{eatery.notes ?? 'N/A'}</Col>
            </Row>
          </Container>
        </Popup>
      </Marker>
    ))}

    {vendingMachines.map((vm) => (
      <Marker key={`vm-${vm.id}`} position={[vm.y, vm.x]} icon={vendingMachineIcon}>
        <Popup>
          <Container>
            <Row className="my-3">
              <Col>
                <strong style={{ fontSize: '18px' }}>Vending Machine</strong>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Type:</strong>
              </Col>
              <Col>{vmType[vm.type]}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Location:</strong>
              </Col>
              <Col>{vm.location}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Floor:</strong>
              </Col>
              <Col>{vm.floor}</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Hours:</strong>
              </Col>
              <Col>{vm.hours}</Col>
            </Row>
          </Container>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Map;
