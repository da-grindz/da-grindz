'use client';
import React from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export default function Planner() {
  return (
    <div className="planner-page">
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
          💪 You’re in <strong>Grindz for Gains</strong> mode — high protein recommended today!
        </div>

        <h1
          className="text-center mb-4"
          style={{
            fontWeight: "600",
            color: "#00684A",
            fontSize: "2.5rem",
          }}
        >
          Weekly Meal Plan
        </h1>

        <Row>
          {/* Meal Plan Table */}
          <Col lg={9}>
            <Table
              bordered
              responsive
              className="text-center align-middle"
              style={{
                borderCollapse: "collapse",
                backgroundColor: "#F9F6EF",
              }}
            >
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#F9F6EF", border: "none" }}></th>
                  {meals.map((meal) => (
                    <th
                      key={meal}
                      style={{
                        backgroundColor: "#FFE7B3",
                        color: "#2D2A26",
                        fontWeight: "600",
                        fontSize: "1rem",
                        border: "none",
                        padding: "12px",
                      }}
                    >
                      {meal}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <th
                      style={{
                        backgroundColor: "#DCE7E2",
                        color: "#00684A",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        border: "none",
                        padding: "12px",
                      }}
                    >
                      {day}
                    </th>
                    {meals.map((meal) => (
                      <td key={`${day}-${meal}`} style={{ border: "none", padding: "8px" }}>
                        <div
                          style={{
                            minHeight: "60px",
                            border: "1px dotted #aaa",
                            borderRadius: "10px",
                            padding: "6px",
                            backgroundColor: "#ffffffc9",
                          }}
                        />
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

                <Card.Title style={{ color: "#00684A", fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
                  Favorite Meals 
                </Card.Title>
                <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem", color: "#2D2A26" }}>
                  <li>Bulgogi Bowl – Korean BBQ</li>
                  <li>Lemon Chicken – Asian Mix</li>
                  <li>Veggie Stir Fry – Stir Crazy</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
