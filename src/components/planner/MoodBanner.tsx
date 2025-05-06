'use client';

import React from 'react';
import styles from './planner.module.css';

type Props = {
  mood: string | null;
};

function getMoodMessage(mood: string | null) {
  switch (mood) {
    case 'Grindz for Gains':
      return 'high protein recommended today.';
    case 'Quick Bento Run':
      return 'grab-and-go meals recommended today.';
    case 'Vegetarian Vibes':
      return 'veggie-packed meals recommended today.';
    case 'Satisfying Sips':
      return 'refreshing drinks recommended today.';
    case 'Sugar Rush':
      return 'sweet treats recommended today.';
    default:
      return 'Set your mood in preferences to personalize this page.';
  }
}

const MoodBanner: React.FC<Props> = ({ mood }) => (
  <div className="d-flex justify-content-center" style={{ marginTop: '2rem' }}>
    <div className={styles.moodBanner}>
      <p style={{ margin: 0 }}>
        <span>You’re in a </span>
        <strong>{mood || 'No Mood Selected'}</strong>
        <span> mode — </span>
        <span>{getMoodMessage(mood)}</span>
      </p>
    </div>
  </div>
);

export default MoodBanner;
