interface MiniUser {
  id: number;
  email: string;
  role: string;
  eateryId?: number | null; // Optional, as not all users may have an associated eatery
  eateryName?: string | null; // Optional, as not all users may have an associated eatery
}

/* Renders a single row in the List Users table. See admin/page.tsx. */
const ListUsersAdmin = ({ id, email, role, eateryId, eateryName }: MiniUser) => (
  <tr>
    <td>{email}</td>
    <td>{role}</td>
    <td>{eateryId ?? 'N/A'}</td>
    <td>{eateryName ?? 'N/A'}</td>
    <td>
      <a href={`/admin/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

ListUsersAdmin.defaultProps = {
  eateryName: 'N/A',
  eateryId: 'N/A',
};

export default ListUsersAdmin;
