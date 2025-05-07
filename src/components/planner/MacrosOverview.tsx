'use client';

import React from 'react';
import styles from './planner.module.css';

type Props = {
  macroGoals: { protein: number; carbs: number; fats: number };
  setMacroGoals: (goals: { protein: number; carbs: number; fats: number }) => void;
  onSave: () => void;
  currentMacros: { protein: number; carbs: number; fats: number };
  calorieGoal: number;
  setCalorieGoal: (goal: number) => void;
};

const MacrosOverview: React.FC<Props> = ({
  macroGoals,
  setMacroGoals,
  onSave,
  currentMacros,
  calorieGoal,
  setCalorieGoal,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMacroGoals({ ...macroGoals, [name]: Number(value) });
  };

  const handleCalorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalorieGoal(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const currentCalories = currentMacros.protein * 4
    + currentMacros.carbs * 4
    + currentMacros.fats * 9;

  const caloriePercent = Math.min(
    (currentCalories / calorieGoal) * 100,
    100,
  );

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.macroForm}>
        <h5 className={styles.macroLabel}>Set Your Macro Goals</h5>
        {(['protein', 'carbs', 'fats'] as const).map((macro) => (
          <div key={macro} className={styles.macroInputGroup}>
            <label htmlFor={macro} className={styles.macroLabel}>
              {macro.charAt(0).toUpperCase() + macro.slice(1)}
              (g):
              <span> (g):</span>
              <input
                type="number"
                onChange={handleChange}
                className={styles.macroInput}
              />
            </label>
          </div>
        ))}

        <div className={styles.macroInputGroup}>
          <label htmlFor="calorieGoal" className={styles.macroLabel}>
            Total Calories Goal (kcal):
            <input
              type="number"
              name="calorieGoal"
              value={calorieGoal}
              onChange={handleCalorieChange}
              className={styles.macroInput}
            />
          </label>
        </div>

        <button type="submit" className={styles.saveButton}>
          Save Goals
        </button>
      </form>

      {(['protein', 'carbs', 'fats'] as const).map((macro) => {
        const value = currentMacros[macro];
        const goal = macroGoals[macro];
        const percent = Math.min((value / goal) * 100, 100);

        return (
          <div key={macro} className={styles.macroBarContainer}>
            <strong className={styles.macroLabel}>
              {macro.charAt(0).toUpperCase() + macro.slice(1)}
            </strong>
            <span className={styles.macroLabel}>:</span>
            <span className={styles.macroLabel}>{value}</span>
            <span className={styles.macroLabel}>g /</span>
            <span className={styles.macroLabel}>{goal}</span>
            <span className={styles.macroLabel}>g</span>
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
        <strong className={styles.macroLabel}>Calories:</strong>
        <span className={styles.macroLabel}>{currentCalories}</span>
        <span className={styles.macroLabel}>kcal /</span>
        <span className={styles.macroLabel}>{calorieGoal}</span>
        <span className={styles.macroLabel}>kcal</span>
        <div className={styles.macroBar}>
          <div
            className={styles.macroFill}
            style={{
              width: `${caloriePercent}%`,
              backgroundColor: '#A8442A',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MacrosOverview;
