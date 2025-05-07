import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ListUsersAdmin from '@/components/ListUsersAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string, role: string };
    } | null,
  );

  const users = await prisma.user.findMany({
    include: {
      eatery: true, // Include the eatery relation
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Users Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Eatery ID</th>
                  <th>Eatery Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <ListUsersAdmin
                    key={user.id}
                    id={user.id}
                    email={user.email}
                    role={user.role}
                    eateryId={user.eatery?.id || null} // Pass eatery ID if available
                    eateryName={user.eatery?.name || null} // Pass eatery name if available
                  />
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
