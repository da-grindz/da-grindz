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

const AddVendorItemForm = ({ vendorId }: { vendorId: string }) => {
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
    };

    try {
      await addVendorItem(sanitizedData);
      swal('Success', 'Vendor item added successfully', 'success');
      reset();
    } catch (err) {
      console.error(err);
      swal('Error', 'Failed to add vendor item', 'error');
    }
  };

  return (
    <Container className="mt-5 py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center">
              <h2>Add New Vendor Item</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" step="0.01" {...register('price')} isInvalid={!!errors.price} />
                  <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} {...register('description')} isInvalid={!!errors.description} />
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
