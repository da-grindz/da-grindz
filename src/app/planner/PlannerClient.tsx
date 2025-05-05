'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import WaterTracker from '@/components/WaterTracker';

type Props = {
  mood: string | null;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const vendorList = [
  'Starbucks',
  'Jamba Juice',
  'Subway',
  'Panda Express',
  'Campus Center Food Court',
  'Holo Holo Bistro',
  'L&L',
  "B'rito Bowl",
];

type MealData = { [day: string]: { [meal: string]: string[] } };

const createInitialPlannerData = (): MealData => Object.fromEntries(
  days.map((day) => [day, Object.fromEntries(mealTypes.map((meal) => [meal, []]))]),
);

function getMoodMessage(mood: string | null) {
  switch (mood) {
    case 'Grindz for Gains':
      return 'high protein recommended today.';
    case 'Quick Bento Run':
      return 'grab-and-go meals recommended today.';
    case 'Vegetarian Vibes':
      return 'veggie-packed meals recommended today.';
    default:
      return 'Set your mood in preferences to personalize this page.';
  }
}

export default function PlannerClient({ mood }: Props) {
  const [plannerData, setPlannerData] = useState<MealData>(createInitialPlannerData);
  const [view, setView] = useState<'weekly' | 'macros'>('weekly');
  const [macroGoals] = useState({ protein: 150, carbs: 250, fats: 70 });
  const [currentMacros] = useState({ protein: 120, carbs: 210, fats: 65 });
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

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
        updated[data.fromDay][data.fromMealType] = updated[data.fromDay][
          data.fromMealType
        ].filter((_, i) => i !== data.index);
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

  const handleClearAll = () => {
    setPlannerData(createInitialPlannerData());
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="content" style={{ backgroundColor: '#FFFFFF', paddingBottom: '2rem' }}>
      <Container fluid className="p-0 m-0">
        <div className="d-flex justify-content-center" style={{ marginTop: '2rem' }}>
          <div
            style={{
              backgroundColor: '#FFF7E6',
              padding: '1rem',
              textAlign: 'center',
              fontStyle: 'italic',
              color: '#A8442A',
              fontWeight: 500,
              borderRadius: '12px',
              width: '75%',
              maxWidth: '1200px',
            }}
          >
            <p style={{ margin: 0 }}>
              <span>You’re in a </span>
              <strong>{mood || 'No Mood Selected'}</strong>
              <span> mode — </span>
              <span>{getMoodMessage(mood)}</span>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1rem' }}>
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
              marginRight: '1rem',
            }}
          >
            {view === 'weekly' ? 'Switch to Macros Overview' : 'Back to Weekly Plan'}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            style={{
              backgroundColor: '#A8442A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        </div>

        <Row className="gx-3 gy-4 px-3 pb-5">
          <Col lg={3}>
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
                {selectedVendor ? (
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    No menu available yet for
                    <br />
                    <strong>{selectedVendor}</strong>
                    .
                  </p>
                ) : (
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    Select a vendor to view their meals.
                  </p>
                )}
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, { meal: 'Test Meal' })}
                  style={{
                    backgroundColor: '#FFF7E6',
                    padding: '8px',
                    borderRadius: '6px',
                    marginTop: '12px',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: '#A8442A',
                    textAlign: 'center',
                    cursor: 'grab',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  🥗 Test Meal
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="h-100" style={{ backgroundColor: '#FFF7E6', borderRadius: '12px' }}>
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

                {/* weekly or macros */}
                {view === 'weekly' ? (
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
            <Card className="h-100" style={{ backgroundColor: '#DCE7E2', borderRadius: '12px' }}>
              <Card.Body>
                <Card.Title style={{ color: '#00684A', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Meal Tracker
                </Card.Title>
                <p className="mb-1"><strong>Protein: 120g</strong></p>
                <p className="mb-1"><strong>Carbs: 210g</strong></p>
                <p className="mb-1"><strong>Fat: 65g</strong></p>
                <p className="mb-1"><strong>Calories: 1,850 kcal</strong></p>
                <hr />
                <WaterTracker />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
