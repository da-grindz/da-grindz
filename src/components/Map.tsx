/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngBounds } from 'leaflet';
import { useEffect, useState } from 'react';
import { Eatery, VendingMachine } from '@prisma/client';

const center: LatLngExpression = [21.299, -157.816];
const bounds: LatLngBounds = new LatLngBounds([21.289, -157.824], [21.309, -157.808]);

export default function Map() {
  const [eateries, setEateries] = useState<Eatery[]>([]);
  const [vendingMachines, setVendingMachines] = useState<VendingMachine[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/locations');
      const data = await res.json();
      setEateries(data.eateries);
      setVendingMachines(data.vendingMachines);
    }
    fetchData();
  }, []);

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
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {eateries.map((eatery) => (
        <Marker key={`eatery-${eatery.id}`} position={[eatery.y, eatery.x]}>
          <Popup>
            <strong>{eatery.name}</strong>
            <br />
            {eatery.location}
            <br />
            {eatery.hours}
          </Popup>
        </Marker>
      ))}

      {vendingMachines.map((vm) => (
        <Marker key={`vm-${vm.id}`} position={[vm.y, vm.x]}>
          <Popup>
            <strong>{`Vending (${vm.type})`}</strong>
            <br />
            {vm.location}
            <br />
            {vm.hours}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
