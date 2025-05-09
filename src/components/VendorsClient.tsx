'use client';

import { useState, useRef } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import VendorsList from './VendorsList';

type Vendor = {
  id: number;
  name: string;
  location: string;
  hours: string;
  phone: string;
  email: string | null;
};

const VendorsClient = ({ vendors }: { vendors: Vendor[] }) => {
  const [search, setSearch] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  const containerRef = useRef<HTMLDivElement>(null);

  const saveVendorList = (list: { id: number; name: string }[]) => {
    console.log('Vendor list saved:', list);
  };

  const handleSearch = () => {
    if (search.trim() === '') {
      setFilteredVendors(vendors);
      return;
    }

    const filtered = vendors.filter((vendor) => vendor.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredVendors(filtered);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <Container fluid ref={containerRef}>
      <Container className="mb-4">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleFormSubmit} className="searchbar">
              <Form.Group controlId="search">
                <InputGroup>
                  <InputGroup.Text
                    style={{
                      backgroundColor: '#2b6555',
                      color: 'white',
                      borderColor: '#2b6555',
                      borderWidth: '1.5px',
                    }}
                  >
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search for a vendor by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      borderWidth: '1.5px',
                      borderColor: '#2b6555',
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <VendorsList vendors={filteredVendors} saveVendorList={saveVendorList} />
    </Container>
  );
};

export default VendorsClient;
