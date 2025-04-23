'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

type MealData = { [day: string]: { [meal: string]: string[] } };

const initialPlannerData: MealData = Object.fromEntries(
  days.map((day) => [day, Object.fromEntries(mealTypes.map((meal) => [meal, []]))]),
);

const mealBankMock = [
  'Garlic Roasted Red Bliss Potatoes',
  'Pork Breakfast Sausage',
  'Rigatoni Pasta',
  'Beef Pho',
  'Texas-style Grilled Cheese Sandwich',
  'Garden Vegetable Soup',
];

export default function Planner() {
  const [plannerData, setPlannerData] = useState<MealData>(initialPlannerData);
  const [view, setView] = useState<'weekly' | 'macros'>('weekly');
  const [macroGoals] = useState({ protein: 150, carbs: 250, fats: 70 });
  const [currentMacros] = useState({ protein: 120, carbs: 210, fats: 65 });

  const handleDragStart = (
    e: React.DragEvent,
    payload: { meal: string; fromDay?: string; fromMealType?: string; index?: number },
  ) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(payload));
  };

  const handleDrop = (e: React.DragEvent, targetDay: string, targetMealType: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (!data.fromDay && data.meal) {
      setPlannerData((prev) => {
        const updated = { ...prev };
        const currentMeals = updated[targetDay][targetMealType];
        if (!currentMeals.includes(data.meal)) {
          updated[targetDay][targetMealType] = [...currentMeals, data.meal];
        }
        return updated;
      });
      return;
    }

    if (data.fromDay && data.fromMealType !== undefined && data.index !== undefined) {
      const draggedMeal = plannerData[data.fromDay][data.fromMealType][data.index];
      if (!draggedMeal) return;

      setPlannerData((prev) => {
        const updated = { ...prev };
        updated[data.fromDay][data.fromMealType] = updated[data.fromDay][data.fromMealType].filter(
          (_, i) => i !== data.index,
        );

        const targetMeals = updated[targetDay][targetMealType];
        if (!targetMeals.includes(draggedMeal)) {
          updated[targetDay][targetMealType] = [...targetMeals, draggedMeal];
        }

        return updated;
      });
    }
  };

  const handleDelete = (day: string, mealType: string, index: number) => {
    setPlannerData((prev) => {
      const updated = { ...prev };
      updated[day][mealType] = updated[day][mealType].filter((_, i) => i !== index);
      return updated;
    });
  };

  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '2rem' }}>
      <Container>
        <div
          style={{
            backgroundColor: '#FFF7E6',
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#A8442A',
            fontWeight: 500,
          }}
        >
          <p style={{ marginBottom: 0 }}>
            You’re in
            <br />
            <strong>Grindz for Gains</strong>
            <br />
            mode — high protein recommended today.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setView(view === 'weekly' ? 'macros' : 'weekly')}
            style={{
              backgroundColor: '#00684A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {view === 'weekly' ? 'Switch to Macros Overview' : 'Back to Weekly Plan'}
          </button>
        </div>

        <Row className="align-items-stretch">
          <Col lg={3}>
            <Card className="h-100 mb-4">
              <Card.Body>
                <Card.Title style={{ color: '#00684A', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Grindz Vault
                </Card.Title>
                {mealBankMock.map((meal) => (
                  <div
                    key={meal}
                    draggable
                    onDragStart={(e) => handleDragStart(e, { meal })}
                    style={{
                      backgroundColor: '#FFF7E6',
                      padding: '6px 8px',
                      marginBottom: '6px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      color: '#A8442A',
                      fontWeight: 500,
                      cursor: 'grab',
                    }}
                  >
                    {meal}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="h-100" style={{ backgroundColor: '#FFF7E6', border: 'none', borderRadius: '12px' }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: '#00684A',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  {view === 'weekly' ? 'Weekly Meal Plan' : 'Macros Goal Overview'}
                </Card.Title>

                {view === 'weekly' ? (
                  <Table bordered className="text-center align-middle mb-0" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th aria-label="Day" />
                        {mealTypes.map((mealHeader) => (
                          <th
                            key={mealHeader}
                            style={{
                              backgroundColor: '#FFE7B3',
                              color: '#2D2A26',
                              fontWeight: 600,
                              fontSize: '1rem',
                              border: 'none',
                              padding: '12px',
                            }}
                          >
                            {mealHeader}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => (
                        <tr key={day}>
                          <th
                            style={{
                              backgroundColor: '#DCE7E2',
                              color: '#00684A',
                              fontWeight: 'bold',
                              fontSize: '0.9rem',
                              border: 'none',
                              padding: '12px',
                            }}
                          >
                            {day}
                          </th>
                          {mealTypes.map((mealType) => (
                            <td
                              key={`${day}-${mealType}`}
                              onDrop={(e) => handleDrop(e, day, mealType)}
                              onDragOver={allowDrop}
                              style={{
                                minHeight: '80px',
                                backgroundColor: '#ffffffc9',
                                border: '1px dotted #aaa',
                                borderRadius: '8px',
                                padding: '6px',
                              }}
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
                                      style={{
                                        backgroundColor: '#FFF7E6',
                                        padding: '6px',
                                        marginBottom: '4px',
                                        borderRadius: '6px',
                                        color: '#A8442A',
                                        fontWeight: 500,
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <span>{mealName}</span>
                                      <button
                                        type="button"
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
                ) : (
                  <>
                    {['protein', 'carbs', 'fats'].map((macro) => {
                      const value = currentMacros[macro as keyof typeof currentMacros];
                      const goal = macroGoals[macro as keyof typeof macroGoals];
                      const percent = Math.min((value / goal) * 100, 100);
                      return (
                        <div key={macro} style={{ marginBottom: '1.5rem' }}>
                          <strong style={{ textTransform: 'capitalize', fontSize: '1.1rem' }}>
                            {`${macro}: ${value}g / ${goal}g`}
                          </strong>
                          <div
                            style={{
                              backgroundColor: '#ddd',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              height: '20px',
                              marginTop: '0.25rem',
                            }}
                          >
                            <div
                              style={{
                                width: `${percent}%`,
                                height: '100%',
                                backgroundColor: '#00684A',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3}>
            <Card className="h-100" style={{ backgroundColor: '#DCE7E2', border: 'none', borderRadius: '12px' }}>
              <Card.Body>
                <Card.Title style={{ color: '#00684A', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Meal Tracker
                </Card.Title>
                <p className="mb-1">
                  Protein:
                  <br />
                  <strong>120g</strong>
                </p>
                <p className="mb-1">
                  Carbs:
                  <br />
                  <strong>210g</strong>
                </p>
                <p className="mb-1">
                  Fat:
                  <br />
                  <strong>65g</strong>
                </p>
                <p className="mb-1">
                  Calories:
                  <br />
                  <strong>1,850 kcal</strong>
                </p>
                <hr />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
