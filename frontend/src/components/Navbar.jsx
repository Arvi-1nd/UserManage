import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <strong>User Manager</strong>

      <span style={{ marginLeft: "20px" }}>
        {user.full_name} ({user.role})
      </span>

      <span style={{ marginLeft: "20px" }}>
        <Link to="/profile">Profile</Link>
        {user.role === "admin" && (
          <>
            {" | "}
            <Link to="/admin/users">Admin</Link>
          </>
        )}
      </span>

      <button
        style={{ marginLeft: "20px", color: "red" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
