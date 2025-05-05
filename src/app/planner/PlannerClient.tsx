'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import swal from 'sweetalert';
import MoodBanner from '@/components/planner/MoodBanner';
import ViewToggleButtons from '@/components/planner/ViewToggleButtons';
import GrindzVault from '@/components/planner/GrindzVault';
import MealPlannerTable from '@/components/planner/MealPlannerTable';
import MacrosOverview from '@/components/planner/MacrosOverview';
import WaterTracker from '@/components/planner/WaterTracker';

type Props = {
  mood: string | null;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

type MealData = { [day: string]: { [meal: string]: string[] } };
type WaterLog = { [day: string]: number };

const createInitialPlannerData = (): MealData => Object.fromEntries(
  days.map((day) => [
    day,
    Object.fromEntries(mealTypes.map((meal) => [meal, []])),
  ]),
);

const createInitialWaterLogs = (): WaterLog => Object.fromEntries(days.map((day) => [day, 0]));

export default function PlannerClient({ mood }: Props) {
  const [plannerData, setPlannerData] = useState<MealData>(createInitialPlannerData);
  const [waterLogs, setWaterLogs] = useState<WaterLog>(createInitialWaterLogs());
  const [hasMounted, setHasMounted] = useState(false);
  const [view, setView] = useState<'weekly' | 'macros'>('weekly');
  const [macroGoals] = useState({ protein: 150, carbs: 250, fats: 70 });
  const [currentMacros] = useState({ protein: 120, carbs: 210, fats: 65 });
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const savedPlanner = localStorage.getItem('plannerData');
    const savedWater = localStorage.getItem('waterLogs');

    if (savedPlanner) {
      try {
        setPlannerData(JSON.parse(savedPlanner));
      } catch (e) {
        console.error('Failed to parse plannerData:', e);
      }
    }

    if (savedWater) {
      try {
        setWaterLogs(JSON.parse(savedWater));
      } catch (e) {
        console.error('Failed to parse waterLogs:', e);
      }
    }
  }, [hasMounted]);

  const handleManualSave = () => {
    try {
      localStorage.setItem('plannerData', JSON.stringify(plannerData));
      localStorage.setItem('waterLogs', JSON.stringify(waterLogs));

      swal('Success', 'Your planner has been saved', 'success', {
        timer: 2000,
      });
    } catch (error) {
      console.error('Save failed:', error);
      swal('Error', 'Failed to save planner. Please try again.', 'error');
    }
  };

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
    setWaterLogs(createInitialWaterLogs());
  };

  if (!hasMounted) return null;

  return (
    <div className="content" style={{ backgroundColor: '#FFFFFF', paddingBottom: '2rem' }}>
      <Container fluid className="p-0 m-0">
        <MoodBanner mood={mood} />
        <ViewToggleButtons view={view} setView={setView} handleClearAll={handleClearAll} />

        <div className="text-center mb-3">
          <button
            type="button"
            onClick={handleManualSave}
            className="btn btn-success"
            style={{ fontWeight: 600, padding: '0.5rem 1rem' }}
          >
            Save Planner
          </button>
        </div>

        <Row className="gx-3 gy-4 px-3 pb-5">
          <Col lg={3}>
            <GrindzVault
              selectedVendor={selectedVendor}
              setSelectedVendor={setSelectedVendor}
              handleDragStart={handleDragStart}
            />
          </Col>

          <Col lg={6}>
            <Card className="h-100" style={{ backgroundColor: '#FFF7E6', borderRadius: '12px' }}>
              <Card.Body>
                <Card.Title
                  className="text-center mb-4"
                  style={{ color: '#00684A', fontWeight: 'bold' }}
                >
                  {view === 'weekly' ? 'Weekly Meal Plan' : 'Macros Goal Overview'}
                </Card.Title>
                {view === 'weekly' ? (
                  <MealPlannerTable
                    days={days}
                    mealTypes={mealTypes}
                    plannerData={plannerData}
                    handleDrop={handleDrop}
                    allowDrop={(e) => e.preventDefault()}
                    handleDragStart={handleDragStart}
                    handleDelete={handleDelete}
                  />
                ) : (
                  <MacrosOverview macroGoals={macroGoals} currentMacros={currentMacros} />
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
                <WaterTracker
                  waterLogs={waterLogs}
                  setWaterLogs={setWaterLogs}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
