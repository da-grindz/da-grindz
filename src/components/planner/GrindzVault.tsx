'use client';

import React, { useEffect, useState } from 'react';
import { mealItems } from '@/lib/mealItems';
import { Card } from 'react-bootstrap';
import styles from './planner.module.css';

type Props = {
  selectedVendor: string | null;
  setSelectedVendor: (vendor: string | null) => void;
  handleDragStart: (e: React.DragEvent, payload: { meal: string }) => void;
};

type Eatery = {
  id: number;
  name: string;
};

const GrindzVault: React.FC<Props> = ({
  selectedVendor,
  setSelectedVendor,
  handleDragStart,
}) => {
  const [eateries, setEateries] = useState<Eatery[]>([]);

  useEffect(() => {
    const fetchEateries = async () => {
      try {
        const res = await fetch('/api/eateries');
        const data = await res.json();
        setEateries(data);
      } catch (err) {
        console.error('Failed to load eateries:', err);
      }
    };

    fetchEateries();
  }, []);

  const availableMeals = mealItems.filter(
    (item) => (selectedVendor ? item.vendor === selectedVendor : false),
  );

  const renderMeals = () => {
    if (!selectedVendor) {
      return (
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          Select a vendor to view their meals.
        </p>
      );
    }

    if (availableMeals.length === 0) {
      return (
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          No meals found for
          {' '}
          <strong>{selectedVendor}</strong>
          .
        </p>
      );
    }

    return availableMeals.map((meal) => (
      <div
        key={meal.name}
        draggable
        onDragStart={(e) => handleDragStart(e, { meal: meal.name })}
        className={styles.vendorMeal}
      >
        {meal.name}
      </div>
    ));
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title
          style={{
            color: '#00684A',
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
        >
          Grindz Vault
        </Card.Title>
        <select
          className="form-select mb-3"
          value={selectedVendor ?? ''}
          onChange={(e) => setSelectedVendor(e.target.value || null)}
        >
          <option value="">Select a Vendor</option>
          {eateries.map((eatery) => (
            <option key={eatery.id} value={eatery.name}>
              {eatery.name}
            </option>
          ))}
        </select>
        {renderMeals()}
      </Card.Body>
    </Card>
  );
};

export default GrindzVault;
