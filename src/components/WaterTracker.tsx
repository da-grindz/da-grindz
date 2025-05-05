'use client';

import React, { useState } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MAX_DROPS = 8;

const WaterTracker: React.FC = () => {
  const createInitialLogs = () => Object.fromEntries(days.map((day) => [day, 0]));

  const [waterLogs, setWaterLogs] = useState<Record<string, number>>(createInitialLogs);

  const handleDropClick = (day: string, index: number) => {
    setWaterLogs((prev) => ({
      ...prev,
      [day]: index + 1 === prev[day] ? index : index + 1,
    }));
  };

  const handleClearAll = () => {
    setWaterLogs(createInitialLogs());
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 style={{ color: '#00684A', fontWeight: 'bold', margin: 0 }}>Water Tracker</h6>
        <button
          type="button"
          onClick={handleClearAll}
          style={{
            backgroundColor: 'transparent',
            color: '#00684A',
            border: 'none',
            textDecoration: 'underline',
            padding: '2px 8px',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          Clear All
        </button>
      </div>
      {days.map((day) => {
        const drops = Array.from({ length: MAX_DROPS }).map((_, i) => (
          <i
            key={`${day}-drop-${i}`}
            className={`bi ${i < waterLogs[day] ? 'bi-droplet-fill' : 'bi-droplet'}`}
            onClick={() => handleDropClick(day, i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleDropClick(day, i);
            }}
            style={{
              color: i < waterLogs[day] ? '#007BFF' : '#ccc',
              fontSize: '1.2rem',
              marginRight: '4px',
              cursor: 'pointer',
            }}
            aria-label={`Water drop ${i + 1} for ${day}`}
          />
        ));

        return (
          <div key={day} style={{ marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: '0.9rem' }}>
              {day}
              :
            </strong>
            {' '}
            {drops}
          </div>
        );
      })}
    </div>
  );
};

export default WaterTracker;
