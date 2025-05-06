'use client';

import React from 'react';
import { mealItems } from '@/lib/mealItems';
import { Card } from 'react-bootstrap';
import styles from './planner.module.css';

type Props = {
  selectedVendor: string | null;
  setSelectedVendor: (vendor: string | null) => void;
  handleDragStart: (e: React.DragEvent, payload: { meal: string }) => void;
};

const vendorList = [
  'Bale', 'Buns Hawaii', "B'rito Bowl", 'Campus Center Food Court', 'Ding Tea',
  'Dunkin Donuts', 'Gateway Cafe', 'Hale Aloha Cafe', 'Holo Holo Grill',
  'Holo Holo Okazuya & Musubi', 'Jamba Juice', 'Krazy Dogs', 'Lasoon', 'L&L',
  'Middle Eats', "Olay's Thai Lao Express", 'Panda Express', 'Quick Bites',
  'Saap Saap HI', 'Starbucks', 'Subway', 'The Bean Counter', 'The Market',
  'Veggi Dogs', 'Walking Tacos Hawaii',
];

const GrindzVault: React.FC<Props> = ({
  selectedVendor,
  setSelectedVendor,
  handleDragStart,
}) => {
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
          <strong>
            {selectedVendor}
          </strong>
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
        {' '}
        {meal.name}
      </div>
    ));
  };

  return (
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
        {renderMeals()}
      </Card.Body>
    </Card>
  );
};

export default GrindzVault;
