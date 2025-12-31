import { useEffect, useState } from "react";
import api from "../api/axios";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [confirm, setConfirm] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users/?page=${page}`);
      setUsers(res.data.results);
      setCount(res.data.count);
    } catch {
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleUser = async () => {
    try {
      await api.patch(
        `/admin/users/${confirm.id}/${
          confirm.active ? "deactivate" : "activate"
        }/`
      );
      setMessage("User status updated");
      setConfirm(null);
      fetchUsers();
    } catch {
      setError("Action failed");
    }
  };

  const totalPages = Math.ceil(count / 10);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.full_name}</td>
              <td>{u.role}</td>
              <td>{u.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  onClick={() =>
                    setConfirm({
                      id: u.id,
                      active: u.is_active,
                    })
                  }
                  style={{ color: u.is_active ? "red" : "green" }}
                >
                  {u.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!confirm}
        message={
          confirm?.active
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?"
        }
        onConfirm={toggleUser}
        onCancel={() => setConfirm(null)}
      />

      <Toast message={message} type="success" />
      <Toast message={error} type="error" />
    </div>
  );
}
