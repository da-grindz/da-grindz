'use client';

import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import swal from 'sweetalert';

type EditUserRoleAndEateryFormProps = {
  userId: number;
  email: string;
  currentRole: string;
  currentEateryName: string;
  onUserUpdated?: () => void;
};

const EditUserRoleAndEateryForm = ({
  userId,
  email,
  currentRole,
  currentEateryName,
  onUserUpdated,
}: EditUserRoleAndEateryFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState(currentRole);
  const [newEateryName, setNewEateryName] = useState(currentEateryName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eateries, setEateries] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Fetch the list of eateries from the API
    const fetchEateries = async () => {
      try {
        const response = await fetch('/api/eateries');
        if (!response.ok) {
          console.error('Failed to fetch eateries:', response.statusText);
          throw new Error('Failed to fetch eateries');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error('Unexpected data format:', data);
          throw new Error('Invalid eateries data format');
        }
        setEateries(data);
      } catch (error) {
        console.error('Error fetching eateries:', error);
      }
    };

    fetchEateries();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/edit-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole, eateryName: newEateryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      swal('Success', `User ${email} updated successfully`, 'success');
      setShowModal(false);

      if (onUserUpdated) {
        console.log('Calling onUserUpdated...');
        onUserUpdated();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      swal('Error', 'Failed to update user. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button id="modalButton" variant="primary" onClick={() => setShowModal(true)}>
        Edit User
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit User:
            {' '}
            {email}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Role Selection */}
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </Form.Control>
            </Form.Group>

            {/* Eatery Selection */}
            <Form.Group>
              <Form.Label>Eatery</Form.Label>
              <Form.Control
                as="select"
                value={newEateryName}
                onChange={(e) => setNewEateryName(e.target.value)}
              >
                <option value="">Select an eatery</option>
                {eateries.map((eatery) => (
                  <option key={eatery.id} value={eatery.name}>
                    {eatery.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            id="modalButton"
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EditUserRoleAndEateryForm.defaultProps = {
  onUserUpdated: undefined,
};

export default EditUserRoleAndEateryForm;
