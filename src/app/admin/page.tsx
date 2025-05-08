'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import EditUserAdmin from '@/components/EditUserAdmin';

const AdminPage = () => {
  interface User {
    id: number;
    email: string;
    role: string;
    eatery?: {
      name: string;
    };
  }

  const [users, setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const updatedUsers = await response.json();
      setUsers([...updatedUsers]);
    } catch (error) {
      console.error('Error refreshing user list:', error);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch('/api/admin/users'); // Create an API route to fetch users
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main>
      <Container id="adminpage" fluid className="py-3 px-5">
        <Row>
          <Col>
            <h1>Overview</h1>
            <p>Manage user roles and their vendors.</p>
            <hr />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Eatery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.eatery?.name || 'N/A'}</td>
                    <td>
                      <EditUserAdmin
                        userId={user.id}
                        email={user.email}
                        currentRole={user.role}
                        currentEateryName={user.eatery?.name || ''}
                        onUserUpdated={refreshUserList} // Pass the callback
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
