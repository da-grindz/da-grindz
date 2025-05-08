'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button, ButtonGroup } from 'react-bootstrap';
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
  const [sortKey, setSortKey] = useState<'email' | 'role' | 'eatery'>('role');

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers([...data]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const refreshUserList = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortKey === 'eatery') {
      return (a.eatery?.name || '').localeCompare(b.eatery?.name || '');
    }
    return a[sortKey].localeCompare(b[sortKey]);
  });

  return (
    <main>
      <Container id="adminpage" fluid className="py-3 px-5">
        <Row>
          <Col>
            <Row className="justify-content-between align-items-center">
              <Col xs={6} md={6} className="">
                <h1>Overview</h1>
                <p>Manage user roles and their vendors.</p>
              </Col>
              <Col id="adminSort" xs={12} lg={3} className="mb-1">
                <ButtonGroup className="d-flex justify-content-between w-100">
                  <Button
                    onClick={() => setSortKey('email')}
                    className={`adminButton ${sortKey === 'email' ? 'active' : ''}`}
                  >
                    Sort By: Email
                  </Button>
                  <Button
                    onClick={() => setSortKey('role')}
                    className={`adminButton ${sortKey === 'role' ? 'active' : ''}`}
                  >
                    Sort By: Role
                  </Button>
                  <Button
                    onClick={() => setSortKey('eatery')}
                    className={`adminButton ${sortKey === 'eatery' ? 'active' : ''}`}
                  >
                    Sort By: Eatery
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Table striped bordered hover className="adminTable">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Eatery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
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
                        onUserUpdated={refreshUserList}
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
