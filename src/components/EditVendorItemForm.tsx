'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { EditVendorItemSchema } from '@/lib/validationSchemas';
import { editVendorItem } from '@/lib/dbActions';

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

type EditVendorItemFormProps = {
  item: {
    id: string;
    name: string;
    image: string;
    alt: string;
    // price: number;
    // description: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    allergies: string[]; // assume these are just names of existing allergies
    vendorId: string;
  };
};

const EditVendorItemForm = ({ item }: EditVendorItemFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditVendorItemSchema),
    defaultValues: {
      name: item.name,
      // price: item.price,
      // description: item.description,
      allergies: item.allergies,
      vendorId: item.vendorId,
      itemId: item.id,
    },
  });

  const onSubmit = async (data: any) => {
    const sanitizedData = {
      ...data,
      allergies: (data.allergies || []).filter((a: unknown): a is string => !!a),
    };

    try {
      await editVendorItem(sanitizedData);
      swal('Success', 'Item updated successfully', 'success');
    } catch (err) {
      console.error(err);
      swal('Error', 'Failed to update item', 'error');
    }
  };

  return (
    <Container className="mt-5 py-3">
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
                        defaultChecked={item.allergies.includes(allergy)}
                        {...register('allergies')}
                      />
                    ))}
                  </div>
                </Form.Group>

                <input type="hidden" value={item.vendorId} {...register('vendorId')} />
                <input type="hidden" value={item.id} {...register('itemId')} />

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
