'use client';

import React from 'react';
import styles from './planner.module.css';

type Props = {
  macroGoals: { protein: number; carbs: number; fats: number };
  setMacroGoals: (goals: { protein: number; carbs: number; fats: number }) => void;
  onSave: () => void;
  currentMacros: { protein: number; carbs: number; fats: number };
};

const MacrosOverview: React.FC<Props> = ({ macroGoals, setMacroGoals, onSave, currentMacros }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMacroGoals({ ...macroGoals, [name]: Number(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const totalCalories = (macroGoals.protein * 4) + (macroGoals.carbs * 4) + (macroGoals.fats * 9);
  const currentCalories = (currentMacros.protein * 4) + (currentMacros.carbs * 4) + (currentMacros.fats * 9);
  const caloriePercent = Math.min((currentCalories / totalCalories) * 100, 100);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.macroForm}>
        <h5 className={styles.macroLabel}>Set Your Macro Goals</h5>
        {(['protein', 'carbs', 'fats'] as const).map((macro) => (
          <div key={macro} className={styles.macroInputGroup}>
            <label htmlFor={macro} className={styles.macroLabel}>
              {macro.charAt(0).toUpperCase() + macro.slice(1)}
              {' '}
              (g):
            </label>
            <input
              type="number"
              id={macro}
              name={macro}
              value={macroGoals[macro]}
              onChange={handleChange}
              className={styles.macroInput}
            />
          </div>
        ))}
        <button type="submit" className={styles.saveButton}>Save Goals</button>
      </form>

      {(['protein', 'carbs', 'fats'] as const).map((macro) => {
        const value = currentMacros[macro];
        const goal = macroGoals[macro];
        const percent = Math.min((value / goal) * 100, 100);

        return (
          <div key={macro} className={styles.macroBarContainer}>
            <strong className={styles.macroLabel}>
              {macro.charAt(0).toUpperCase() + macro.slice(1)}
              {`: ${value}g / ${goal}g`}
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

      <div className={styles.macroBarContainer}>
        <strong className={styles.macroLabel}>
          Calories:
          {' '}
          {currentCalories}
          {' '}
          kcal /
          {' '}
          {totalCalories}
          {' '}
          kcal
        </strong>
        <div className={styles.macroBar}>
          <div
            className={styles.macroFill}
            style={{ width: `${caloriePercent}%`, backgroundColor: '#A8442A' }}
          />
        </div>
      </div>
    </>
  );
};

export default MacrosOverview;
