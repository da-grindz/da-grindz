'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { EditVendorItemSchema } from '@/lib/validationSchemas';
import { editVendorItem } from '@/lib/dbActions';

// const allergiesList = [
//   'Peanuts',
//   'Tree Nuts',
//   'Milk',
//   'Fish',
//   'Shellfish',
//   'Wheat',
//   'Gluten',
//   'Sesame',
//   'Mustard',
// ];

type EditVendorItemFormProps = {
  item: {
    id: number;
    name: string;
    image: string;
    alt: string;
    price: number;
    description: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    allergies: string[];
    vendorId: string;
  };
};

const EditVendorItemForm = ({ item }: EditVendorItemFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditVendorItemSchema),
    defaultValues: {
      id: item.id, // Include the id field
      name: item.name,
      image: item.image,
      alt: item.alt,
      price: item.price,
      description: item.description,
      calories: item.calories,
      protein: item.protein,
      fat: item.fat,
      carbs: item.carbs,
      allergies: item.allergies,
      vendorId: item.vendorId,
    },
  });

  const onSubmit = async (data: any) => {
    console.log('Submitted data:', data); // Debugging log

    const sanitizedData = {
      ...data,
      id: parseInt(data.id, 10), // Ensure id is a number
      allergies: (data.allergies || []).filter((a: unknown): a is string => !!a),
    };

    try {
      await editVendorItem(sanitizedData);
      swal('Success', 'Item updated successfully', 'success');
    } catch (err) {
      console.error('Error editing vendor item:', err);
      swal('Error', 'Failed to update item', 'error');
    }
  };

  return (
    <Container id="vendor-item-form" className="mt-5 py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center">
              <h2>Edit Vendor Item</h2>
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
                  <Form.Control type="text" {...register('image')} isInvalid={!!errors.image} />
                  <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Alt Text</Form.Label>
                  <Form.Control type="text" {...register('alt')} isInvalid={!!errors.alt} />
                  <Form.Control.Feedback type="invalid">{errors.alt?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" step="0.01" {...register('price')} isInvalid={!!errors.price} />
                  <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                </Form.Group>

                <input type="hidden" value={item.id} {...register('id')} />

                <Row>
                  <Col>
                    <Button type="submit" variant="primary">
                      Update Item
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

export default EditVendorItemForm;
