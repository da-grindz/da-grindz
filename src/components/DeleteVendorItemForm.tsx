'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter allows us to navigate after deletion
import { Button, Modal } from 'react-bootstrap'; // Modal allows us to create a popup dialog
import swal from 'sweetalert';
import { deleteVendorItem } from '@/lib/dbActions';

type DeleteVendorItemFormProps = {
  itemId: number;
  onDeleteSuccess?: () => void; // Optional callback after successful deletion
};

const DeleteVendorItemForm = ({ itemId, onDeleteSuccess }: DeleteVendorItemFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter(); // Use Next.js router for navigation

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVendorItem(itemId);
      swal('Success', 'Vendor item deleted successfully', 'success');
      setShowModal(false);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }

      // Redirect to the vendor page
      router.push('/vendors');
    } catch (error) {
      console.error('Error deleting vendor item:', error);
      swal('Error', 'Failed to delete vendor item', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button className="vendorItem" onClick={() => setShowModal(true)}>
        Delete Item
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this vendor item? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="vendorItem" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className="vendorItem" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteVendorItemForm.defaultProps = {
  onDeleteSuccess: undefined,
};

export default DeleteVendorItemForm;
