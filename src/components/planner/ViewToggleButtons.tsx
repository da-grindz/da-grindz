'use client';

import React from 'react';
import styles from './planner.module.css';

type Props = {
  view: 'weekly' | 'macros';
  setView: (view: 'weekly' | 'macros') => void;
  handleClearAll: () => void;
};

const ViewToggleButtons: React.FC<Props> = ({ view, setView, handleClearAll }) => (
  <div style={{ textAlign: 'center', padding: '1rem' }}>
    <button
      type="button"
      onClick={() => setView(view === 'weekly' ? 'macros' : 'weekly')}
      className={styles.toggleButton}
    >
      {view === 'weekly' ? 'Switch to Macros Overview' : 'Back to Weekly Plan'}
    </button>
    <button
      type="button"
      onClick={handleClearAll}
      className={styles.clearButton}
    >
      Clear All
    </button>
  </div>
);

export default ViewToggleButtons;
