'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PreferencesSchema } from '@/lib/validationSchemas';
import { addPreferences } from '@/lib/dbActions';

const allergiesList = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Fish',
  'Shellfish',
  'Wheat',
  'Gluten',
  'Sesame',
  'Mustard',
];

const onSubmit = async (data: { allergies?: (string | undefined)[]; mood: string; owner: string }) => {
  try {
    console.log('Raw form data:', data);

    const sanitizedData = {
      ...data,
      allergies: (data.allergies || []).filter((allergy): allergy is string => !!allergy),
    };

    console.log('Sanitized data:', sanitizedData);

    await addPreferences(sanitizedData);

    swal('Success', 'Your preferences have been updated', 'success', {
      timer: 2000,
    });
  } catch (error) {
    console.error('Error during form submission:', error);
    swal('Error', 'Failed to update preferences. Please try again.', 'error');
  }
};

const PreferencesForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PreferencesSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Card>
            <Card.Header>
              <Col className="text-center">
                <h2>TESTING</h2>
              </Col>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Allergies */}
                <Form.Group>
                  <Form.Label>Allergies</Form.Label>
                  <div>
                    {allergiesList.map((allergy) => (
                      <Form.Check
                        key={allergy}
                        type="checkbox"
                        label={allergy}
                        value={allergy}
                        {...register('allergies')}
                      />
                    ))}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Grindz Mood</Form.Label>
                  <select {...register('mood')} className={`form-control ${errors.mood ? 'is-invalid' : ''}`}>
                    <option value="">Select a mood</option>
                    <option value="Vegetarian Vibes">Vegetarian Vibes</option>
                    <option value="Quick Bento Run">Quick Bento Run</option>
                    <option value="Grindz For Gainz">Grindz For Gainz</option>
                  </select>
                  <div className="invalid-feedback">{errors.mood?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PreferencesForm;
