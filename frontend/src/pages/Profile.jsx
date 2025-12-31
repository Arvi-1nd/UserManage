import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axios";
import Toast from "../components/Toast";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateProfile = async () => {
    try {
      await api.put("/profile/", {
        full_name: fullName,
        email: email,
      });
      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Both password fields are required");
      return;
    }

    try {
      await api.put("/change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setMessage("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setError("");
    } catch (err) {
      setError("Password change failed");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>

      {/* Profile Info */}
      <section>
        <h3>Profile Information</h3>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={updateProfile}>Save</button>
        <button
          onClick={() => {
            setFullName(user.full_name);
            setEmail(user.email);
          }}
        >
          Cancel
        </button>
      </section>

      <hr />

      {/* Change Password */}
      <section>
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={changePassword}>Change Password</button>
      </section>

      <hr />

      <button style={{ color: "red" }} onClick={logout}>
        Logout
      </button>

      <Toast message={message} type="success" />
      <Toast message={error} type="error" />
    </div>
  );
}
