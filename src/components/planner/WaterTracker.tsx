'use client';

import React from 'react';

type WaterTrackerProps = {
  waterLogs: Record<string, number>;
  setWaterLogs: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MAX_DROPS = 8;
const dropIds = Array.from({ length: MAX_DROPS }, (_, i) => `drop-${i + 1}`);

const WaterTracker: React.FC<WaterTrackerProps> = ({ waterLogs, setWaterLogs }) => {
  const handleDropClick = (day: string, index: number) => {
    setWaterLogs((prev) => ({
      ...prev,
      [day]: index + 1 === prev[day] ? index : index + 1,
    }));
  };

  const handleClearAll = () => {
    setWaterLogs(Object.fromEntries(days.map((day) => [day, 0])));
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6 style={{ color: '#00684A', fontWeight: 'bold', margin: 0 }}>
            Water Tracker
          </h6>
          <small style={{ fontSize: '0.75rem', color: '#00684A' }}>
            1 drop = 1 glass of water
          </small>
        </div>
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

      {days.map((day) => (
        <div key={day} style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{day}</div>
          <div>
            {dropIds.map((id, dropIndex) => (
              <i
                key={`${day}-${id}`}
                className={`bi ${
                  dropIndex < waterLogs[day]
                    ? 'bi-droplet-fill'
                    : 'bi-droplet'
                }`}
                onClick={() => handleDropClick(day, dropIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDropClick(day, dropIndex);
                  }
                }}
                style={{
                  color: dropIndex < waterLogs[day] ? '#007BFF' : '#ccc',
                  fontSize: '1.2rem',
                  marginRight: '4px',
                  cursor: 'pointer',
                }}
                aria-label={`Water drop ${dropIndex + 1} for ${day}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaterTracker;
