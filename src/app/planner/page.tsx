'use client';
import React, { useState } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

type MealData = { [day: string]: { [meal: string]: string[] } };

const initialPlannerData: MealData = Object.fromEntries(
  days.map(day => [
    day,
    Object.fromEntries(meals.map(meal => [meal, []]))
  ])
);

const mealBankMock = [
  "Garlic Roasted Red Bliss Potatoes",
  "Pork Breakfast Sausage",
  "Rigatoni Pasta",
  "Beef Pho",
  "Texas-style Grilled Cheese Sandwich",
  "Garden Vegetable Soup",
];

export default function Planner() {
  const [plannerData, setPlannerData] = useState<MealData>(initialPlannerData);

  const handleDragStart = (
    e: React.DragEvent,
    payload: { meal: string; fromDay?: string; fromMealType?: string; index?: number }
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(payload));
  };

  const handleDrop = (e: React.DragEvent, targetDay: string, targetMealType: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    // From Meal Bank
    if (!data.fromDay && data.meal) {
      setPlannerData(prev => {
        const updated = { ...prev };
        const currentMeals = updated[targetDay][targetMealType];
        if (!currentMeals.includes(data.meal)) {
          updated[targetDay][targetMealType] = [...currentMeals, data.meal];
        }
        return updated;
      });
      return;
    }

    // From Planner (Move)
    if (data.fromDay && data.fromMealType !== undefined && data.index !== undefined) {
      const draggedMeal = plannerData[data.fromDay][data.fromMealType][data.index];
      if (!draggedMeal) return;

      setPlannerData(prev => {
        const updated = { ...prev };

        // Remove from old location
        updated[data.fromDay][data.fromMealType] = updated[data.fromDay][data.fromMealType].filter(
          (_, i) => i !== data.index
        );

        // Add to new location (prevent duplicate)
        const current = updated[targetDay][targetMealType];
        if (!current.includes(draggedMeal)) {
          updated[targetDay][targetMealType] = [...current, draggedMeal];
        }

        return updated;
      });
    }
  };

  const handleDelete = (day: string, mealType: string, index: number) => {
    setPlannerData(prev => {
      const updated = { ...prev };
      updated[day][mealType] = updated[day][mealType].filter((_, i) => i !== index);
      return updated;
    });
  };

  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", padding: "2rem" }}>
      <Container>
        {/* Mood Banner */}
        <div
          style={{
            backgroundColor: "#FFF7E6",
            padding: "1rem",
            marginBottom: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            fontStyle: "italic",
            color: "#A8442A",
            fontWeight: 500,
          }}
        >
          You’re in <strong>Grindz for Gains</strong> mode — high protein recommended today.
        </div>

        <h1 className="text-center mb-4" style={{ fontWeight: "600", color: "#00684A", fontSize: "2.5rem" }}>
          Weekly Meal Plan
        </h1>

        <Row>
          {/* Grindz Vault (Meal Bank) */}
          <Col lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title style={{ color: "#00684A", fontSize: "1.1rem", fontWeight: "bold" }}>
                  Grindz Vault
                </Card.Title>
                {mealBankMock.map((meal, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, { meal })}
                    style={{
                      backgroundColor: "#FFF7E6",
                      padding: "6px 8px",
                      marginBottom: "6px",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      color: "#A8442A",
                      fontWeight: 500,
                      cursor: "grab",
                    }}
                  >
                    {meal}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Meal Planner Table */}
          <Col lg={6}>
            <Table bordered className="text-center align-middle" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th></th>
                  {meals.map((meal) => (
                    <th key={meal} style={{ backgroundColor: "#FFE7B3", color: "#2D2A26" }}>
                      {meal}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <th style={{ backgroundColor: "#DCE7E2", color: "#00684A" }}>{day}</th>
                    {meals.map((mealType) => (
                      <td
                        key={`${day}-${mealType}`}
                        onDrop={(e) => handleDrop(e, day, mealType)}
                        onDragOver={allowDrop}
                        style={{
                          minHeight: "80px",
                          backgroundColor: "#ffffffc9",
                          border: "1px dotted #aaa",
                          borderRadius: "8px",
                          padding: "6px",
                        }}
                      >
                        {plannerData[day][mealType].length > 0 ? (
                          plannerData[day][mealType].map((mealName, index) => (
                            <div
                              key={`${mealName}-${index}`}
                              draggable
                              onDragStart={(e) =>
                                handleDragStart(e, {
                                  meal: mealName,
                                  fromDay: day,
                                  fromMealType: mealType,
                                  index,
                                })
                              }
                              style={{
                                backgroundColor: "#FFF7E6",
                                padding: "6px",
                                marginBottom: "4px",
                                borderRadius: "6px",
                                color: "#A8442A",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span>{mealName}</span>
                              <button
                                onClick={() => handleDelete(day, mealType, index)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#A8442A",
                                  fontWeight: "bold",
                                  fontSize: "1rem",
                                  marginLeft: "8px",
                                  cursor: "pointer",
                                }}
                                aria-label="Delete meal"
                              >
                                ×
                              </button>
                            </div>
                          ))
                        ) : (
                          <span style={{ color: "#ccc", fontSize: "0.85rem" }}>Empty</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          {/* Sidebar */}
          <Col lg={3} className="mt-4 mt-lg-0">
            <Card
              style={{
                backgroundColor: "#DCE7E2",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#00684A", fontWeight: "bold", fontSize: "1.2rem" }}>
                  Meal Tracker
                </Card.Title>
                <p style={{ color: "#2D2A26", marginBottom: "0.5rem" }}>
                  Meals Remaining: <strong>12</strong>
                </p>
                <p style={{ color: "#2D2A26" }}>
                  Points Remaining: <strong>45</strong>
                </p>

                <hr />

                <Card.Title style={{ color: "#00684A", fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
                  Macros Summary
                </Card.Title>
                <p className="mb-1">Protein: <strong>120g</strong></p>
                <p className="mb-1">Carbs: <strong>210g</strong></p>
                <p className="mb-1">Fat: <strong>65g</strong></p>
                <p className="mb-1">Calories: <strong>1,850 kcal</strong></p>

                <hr />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
