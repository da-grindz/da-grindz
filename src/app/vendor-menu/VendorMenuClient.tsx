'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VendorMenuDash from '../../components/vendorMenu/VendorMenuDash';

export default function VendorMenuClient({ vendors }: { vendors: { id: number; name: string }[] }) {
  const [selectedVendor, setSelectedVendor] = useState<number | null>(vendors[0]?.id || null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedVendor) return;

      const res = await fetch(`/api/vendor-items?vendorId=${selectedVendor}`);
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, [selectedVendor]);

  return (
    <Container fluid className="py-3">
      <Container id="vendor-banner" className="pt-4 pb-1 mt-3 mb-3">
        <Row>
          <Col className="text-center px-5">
            <h1>Vendor Menu</h1>
            <p>Explore the delicious offerings from our vendors.</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <select
              value={selectedVendor || ''}
              onChange={(e) => setSelectedVendor(Number(e.target.value))}
            >
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
      </Container>
      <VendorMenuDash items={items} />
    </Container>
  );
}
