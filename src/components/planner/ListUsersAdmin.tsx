interface MiniUser {
  id: number;
  email: string;
  role: string;
}

/* Renders a single row in the List Users table. See admin/page.tsx. */
const ListUsersAdmin = ({ id, email, role }: MiniUser) => (
  <tr>
    <td>{email}</td>
    <td>{role}</td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default ListUsersAdmin;
