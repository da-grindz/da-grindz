'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import LoadingSpinner from '@/components/LoadingSpinner';
import { PreferencesSchema } from '@/lib/validationSchemas';
import { addPreferences } from '@/lib/dbActions';
import { useEffect } from 'react';
import { GiPeanut, GiWheat, GiSesame, GiMilkCarton } from 'react-icons/gi';
import { FaSeedling, FaFish, FaBreadSlice } from 'react-icons/fa';
import { TbBottleFilled } from 'react-icons/tb';
import { FaShrimp } from 'react-icons/fa6';

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

const iconList: Record<string, JSX.Element> = {
  Peanuts: <GiPeanut />,
  'Tree Nuts': <FaSeedling />,
  Milk: <GiMilkCarton />,
  Fish: <FaFish />,
  Shellfish: <FaShrimp />,
  Wheat: <GiWheat />,
  Gluten: <FaBreadSlice />,
  Sesame: <GiSesame />,
  Mustard: <TbBottleFilled />,
};

interface PreferencesFormProps {
  userAllergies: string[];
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ userAllergies }: PreferencesFormProps) => {
  console.log('Rendering PreferencesForm...');
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize the router for navigation
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PreferencesSchema),
    defaultValues: {
      allergies: userAllergies || [],
      mood: '',
      owner: '', // Temp value; will be updated when session loads
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      reset({
        allergies: userAllergies || [],
        mood: '',
        owner: session.user.email,
      });
    }
  }, [session, reset, userAllergies]);

  const onSubmit = async (data: { allergies?: (string | undefined)[]; mood: string; owner: string }) => {
    try {
      const sanitizedData = {
        ...data,
        allergies: (data.allergies || []).filter((allergy): allergy is string => !!allergy),
      };

      await addPreferences(sanitizedData);
      swal('Success', 'Your preferences have been updated', 'success', {
        timer: 2000,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error during form submission:', error);
      swal('Error', 'Failed to update preferences. Please try again.', 'error');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
  }

  console.log('Session:', session);
  console.log('Status:', status);
  console.log('Current User:', currentUser);

  return (
    <Container id="preference-page" className="mt-5 py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header>
              <Col className="text-center">
                <h1 className="pt-2">Preferences Editor</h1>
                <p className="pt-2">
                  Please fill out the form below to let us know about your allergies and mood.
                  <br />
                  <br />
                  <strong className="pt-1">
                    Note: You can edit this at any time!
                  </strong>
                </p>
              </Col>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Allergies */}
                <Form.Group>
                  <Form.Label className="pt-1">Allergies</Form.Label>
                  <div>
                    {allergiesList.map((allergy) => (
                      <Form.Check
                        className="allergy-checkbox"
                        key={allergy}
                        type="checkbox"
                        label={
                          (
                            <span className="allergy-label">
                              {iconList[allergy]}
                              {' '}
                              {allergy}
                            </span>
                          )
                        }
                        value={allergy}
                        defaultChecked={userAllergies.includes(allergy)}
                        {...register('allergies')}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="pt-2">Grindz Mood</Form.Label>
                  <select {...register('mood')} className={`form-control ${errors.mood ? 'is-invalid' : ''}`}>
                    <option value="">Select a mood</option>
                    <option value="Vegetarian Vibes">Vegetarian Vibes</option>
                    <option value="Quick Bento Run">Quick Bento Run</option>
                    <option value="Grindz for Gains">Grindz for Gains</option>
                    <option value="Satisfying Sips">Satisfying Sips</option>
                    <option value="Sugar Rush">Sugar Rush</option>
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
            <Card.Footer className="text-muted">
              <p className="text-center">
                Not sure what to pick? Check out our
                {' '}
                <a href="/grindz-mood">mood page</a>
                {' '}
                for some suggestions!
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PreferencesForm;
