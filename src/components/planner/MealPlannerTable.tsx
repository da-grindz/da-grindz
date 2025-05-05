'use client';

import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './planner.module.css';

type Props = {
  days: string[];
  mealTypes: string[];
  plannerData: { [day: string]: { [mealType: string]: string[] } };
  handleDrop: (e: React.DragEvent, day: string, mealType: string) => void;
  allowDrop: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, payload: any) => void;
  handleDelete: (day: string, mealType: string, index: number) => void;
};

const MealPlannerTable: React.FC<Props> = ({
  days,
  mealTypes,
  plannerData,
  handleDrop,
  allowDrop,
  handleDragStart,
  handleDelete,
}) => (
  <Table bordered className="text-center align-middle mb-0">
    <thead>
      <tr>
        <th scope="col">Day</th>
        {mealTypes.map((mealHeader) => (
          <th key={mealHeader}>{mealHeader}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {days.map((day) => (
        <tr key={day}>
          <th style={{ backgroundColor: '#DCE7E2' }}>{day}</th>
          {mealTypes.map((mealType) => (
            <td
              key={`${day}-${mealType}`}
              onDrop={(e) => handleDrop(e, day, mealType)}
              onDragOver={allowDrop}
              className={styles.droppableCell}
            >
              {plannerData[day][mealType].length > 0 ? (
                plannerData[day][mealType].map((mealName, idx, arr) => {
                  const occurrence = arr.slice(0, idx).filter((m) => m === mealName).length;
                  const uniqueKey = `${day}-${mealType}-${mealName}-${occurrence}`;
                  return (
                    <div
                      key={uniqueKey}
                      draggable
                      onDragStart={(e) => handleDragStart(e, {
                        meal: mealName,
                        fromDay: day,
                        fromMealType: mealType,
                        index: occurrence,
                      })}
                      className={styles.draggableMeal}
                    >
                      <span>{mealName}</span>
                      <button
                        type="button"
                        aria-label={`Delete ${mealName} from ${mealType} on ${day}`}
                        onClick={() => handleDelete(day, mealType, occurrence)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#A8442A',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          marginLeft: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        x
                      </button>
                    </div>
                  );
                })
              ) : (
                <span style={{ color: '#ccc', fontSize: '0.85rem' }}>Empty</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default MealPlannerTable;
