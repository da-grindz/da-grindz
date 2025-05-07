import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import EditUserAdmin from '@/components/EditUserAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const users = await prisma.user.findMany({
    include: {
      eatery: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main>
      <Container id="adminpage" fluid className="py-3 px-5">
        <Row>
          <Col>
            <h1>Overview</h1>
            <p>Manage user roles and eateries.</p>
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
