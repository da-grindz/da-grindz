'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { AddVendorItemSchema } from '@/lib/validationSchemas';
import { addVendorItem } from '@/lib/dbActions';

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

const AddVendorItemForm = ({ vendorId, owner }: { vendorId: string; owner: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddVendorItemSchema),
  });

  const onSubmit = async (data: any) => {
    const sanitizedData = {
      ...data,
      allergies: (data.allergies || []).filter((a: unknown): a is string => !!a),
      vendorId,
      owner,
    };

    try {
      await addVendorItem(sanitizedData);
      swal('Success', 'Vendor item added successfully', 'success');
      reset(); // Reset the form
    } catch (err: any) {
      console.error('Error adding vendor item:', err);
      swal('Error', 'Failed to add vendor item. Please check your input and try again.', 'error');
    }
  };

  return (
    <Container id="vendor-item-form" className="mt-5 py-3">
      <Row className="justify-content-center mb-5">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center pt-3">
              <h1>Add A New Menu Item</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the image URL"
                    {...register('image')}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the name of your image"
                    {...register('alt')}
                    isInvalid={!!errors.alt}
                  />
                  <Form.Control.Feedback type="invalid">{errors.alt?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the number of grams of calories"
                    {...register('calories')}
                    isInvalid={!!errors.calories}
                  />
                  <Form.Control.Feedback type="invalid">{errors.calories?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Protein (g)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the amount of grams of protein"
                    {...register('protein')}
                    isInvalid={!!errors.protein}
                  />
                  <Form.Control.Feedback type="invalid">{errors.protein?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fat (g)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the amount of grams of fat"
                    {...register('fat')}
                    isInvalid={!!errors.fat}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fat?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Carbohydrates (g)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the amount of grams of carbohydrates"
                    {...register('carbs')}
                    isInvalid={!!errors.carbs}
                  />
                  <Form.Control.Feedback type="invalid">{errors.carbs?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the price of the item."
                    {...register('price')}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please describe the food."
                    rows={3}
                    {...register('description')}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
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

                <input type="hidden" value={vendorId} {...register('vendorId')} />

                <Row>
                  <Col>
                    <Button type="submit" variant="primary">
                      Add Item
                    </Button>
                  </Col>
                  <Col>
                    <Button type="button" variant="warning" onClick={() => reset()}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVendorItemForm;
