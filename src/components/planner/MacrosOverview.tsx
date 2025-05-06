'use client';

import React from 'react';
import styles from './planner.module.css';

type Props = {
  macroGoals: { protein: number; carbs: number; fats: number };
  currentMacros: { protein: number; carbs: number; fats: number };
};

const MacrosOverview: React.FC<Props> = ({ macroGoals, currentMacros }) => (
  <>
    {(['protein', 'carbs', 'fats'] as const).map((macro) => {
      const value = currentMacros[macro];
      const goal = macroGoals[macro];
      const percent = Math.min((value / goal) * 100, 100);

      return (
        <div key={macro} className={styles.macroBarContainer}>
          <strong className={styles.macroLabel}>
            {`${macro}: ${value}g / ${goal}g`}
          </strong>
          <div className={styles.macroBar}>
            <div
              className={styles.macroFill}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      );
    })}
  </>
);

export default MacrosOverview;
