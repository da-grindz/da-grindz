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
import { mealMacros } from '@/lib/mealItems';

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

const createInitialWaterLogs = (): WaterLog => Object.fromEntries(
  days.map((day) => [day, 0]),
);

export default function PlannerClient({ mood }: Props) {
  const [plannerData, setPlannerData] = useState<MealData>(createInitialPlannerData());
  const [waterLogs, setWaterLogs] = useState<WaterLog>(createInitialWaterLogs());
  const [hasMounted, setHasMounted] = useState(false);
  const [view, setView] = useState<'weekly' | 'macros'>('weekly');
  const [macroGoals, setMacroGoals] = useState({ protein: 150, carbs: 250, fats: 70 });
  const [currentMacros, setCurrentMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    try {
      const savedPlanner = localStorage.getItem('plannerData');
      const savedWater = localStorage.getItem('waterLogs');
      const savedMacros = localStorage.getItem('macroGoals');
      const savedCurrent = localStorage.getItem('currentMacros');
      const savedCalorieGoal = localStorage.getItem('calorieGoal');

      if (savedPlanner) setPlannerData(JSON.parse(savedPlanner));
      if (savedWater) setWaterLogs(JSON.parse(savedWater));
      if (savedMacros) setMacroGoals(JSON.parse(savedMacros));
      if (savedCurrent) setCurrentMacros(JSON.parse(savedCurrent));
      if (savedCalorieGoal) setCalorieGoal(Number(savedCalorieGoal));
    } catch (e) {
      console.error('Error parsing saved data:', e);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('currentMacros', JSON.stringify(currentMacros));
    }
  }, [currentMacros, hasMounted]);

  const addMacros = (mealName: string, direction: 'add' | 'subtract') => {
    const macros = mealMacros[mealName];
    if (!macros) return;

    setCurrentMacros((prev) => ({
      protein: direction === 'add' ? prev.protein + macros.protein : prev.protein - macros.protein,
      carbs: direction === 'add' ? prev.carbs + macros.carbs : prev.carbs - macros.carbs,
      fats: direction === 'add' ? prev.fats + macros.fats : prev.fats - macros.fats,
    }));
  };

  const handleManualSave = () => {
    try {
      localStorage.setItem('plannerData', JSON.stringify(plannerData));
      localStorage.setItem('waterLogs', JSON.stringify(waterLogs));
      localStorage.setItem('currentMacros', JSON.stringify(currentMacros));
      swal('Success', 'Your planner has been saved', 'success', { timer: 2000 });
    } catch (error) {
      console.error('Save failed:', error);
      swal('Error', 'Failed to save planner. Please try again.', 'error');
    }
  };

  const handleSaveMacroGoals = () => {
    try {
      localStorage.setItem('macroGoals', JSON.stringify(macroGoals));
      localStorage.setItem('calorieGoal', String(calorieGoal));
      swal('Success', 'Your macro goals have been saved', 'success', { timer: 2000 });
    } catch (error) {
      console.error('Save failed:', error);
      swal('Error', 'Failed to save macro goals. Please try again.', 'error');
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
          addMacros(data.meal, 'add');
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
          addMacros(draggedMeal, 'add');
        }
        return updated;
      });
    }
  };

  const handleDelete = (day: string, mealType: string, index: number) => {
    const deletedMeal = plannerData[day][mealType][index];
    addMacros(deletedMeal, 'subtract');
    setPlannerData((prev) => {
      const updated = { ...prev };
      updated[day][mealType] = updated[day][mealType].filter((_, i) => i !== index);
      return updated;
    });
  };

  const handleClearAll = () => {
    setPlannerData(createInitialPlannerData());
    setWaterLogs(createInitialWaterLogs());
    setCurrentMacros({ protein: 0, carbs: 0, fats: 0 });
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
                <Card.Title className="text-center mb-4" style={{ color: '#00684A', fontWeight: 'bold' }}>
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
                  <MacrosOverview
                    macroGoals={macroGoals}
                    setMacroGoals={setMacroGoals}
                    onSave={handleSaveMacroGoals}
                    currentMacros={currentMacros}
                    calorieGoal={calorieGoal}
                    setCalorieGoal={setCalorieGoal}
                  />
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

                <p className="mb-1">
                  <strong>
                    Protein:
                    {' '}
                    {currentMacros.protein}
                    {' '}
                    g
                  </strong>
                </p>

                <p className="mb-1">
                  <strong>
                    Carbs:
                    {' '}
                    {currentMacros.carbs}
                    {' '}
                    g
                  </strong>
                </p>

                <p className="mb-1">
                  <strong>
                    Fat:
                    {' '}
                    {currentMacros.fats}
                    {' '}
                    g
                  </strong>
                </p>

                <p className="mb-1">
                  <strong>
                    Calories:
                    {' '}
                    {(currentMacros.protein * 4)
                      + (currentMacros.carbs * 4)
                      + (currentMacros.fats * 9)}
                    {' '}
                    kcal
                  </strong>
                </p>

                <hr />
                <WaterTracker waterLogs={waterLogs} setWaterLogs={setWaterLogs} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
