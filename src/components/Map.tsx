/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngBounds } from 'leaflet';

const center: LatLngExpression = [21.299, -157.816];
const bounds: LatLngBounds = new LatLngBounds([21.289, -157.824], [21.309, -157.808]);

export default function Map() {
  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom
      style={{ height: '100%' }}
      maxBounds={bounds}
    >
      <TileLayer
        minZoom={16}
        maxZoom={20}
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Markers will go here later */}
    </MapContainer>
  );
}
