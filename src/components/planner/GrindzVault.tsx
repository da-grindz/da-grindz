'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './planner.module.css';

type Props = {
  selectedVendor: string | null;
  setSelectedVendor: (vendor: string | null) => void;
  handleDragStart: (e: React.DragEvent, payload: { meal: string }) => void;
};

const vendorList = [
  'Starbucks',
  'Jamba Juice',
  'Subway',
  'Panda Express',
  'Campus Center Food Court',
  'Holo Holo Bistro',
  'L&L',
  "B'rito Bowl",
];

const GrindzVault: React.FC<Props> = ({ selectedVendor, setSelectedVendor, handleDragStart }) => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title style={{ color: '#00684A', fontSize: '1.1rem', fontWeight: 'bold' }}>
        Grindz Vault
      </Card.Title>
      <select
        className="form-select mb-3"
        value={selectedVendor ?? ''}
        onChange={(e) => setSelectedVendor(e.target.value || null)}
      >
        <option value="">Select a Vendor</option>
        {vendorList.map((vendor) => (
          <option key={vendor} value={vendor}>
            {vendor}
          </option>
        ))}
      </select>
      {selectedVendor ? (
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          No menu available yet for
          <br />
          <strong>{selectedVendor}</strong>
          .
        </p>
      ) : (
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          Select a vendor to view their meals.
        </p>
      )}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, { meal: 'Test Meal' })}
        className={styles.vendorMeal}
      >
        🥗 Test Meal
      </div>
    </Card.Body>
  </Card>
);

export default GrindzVault;
