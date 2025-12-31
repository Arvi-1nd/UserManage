import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fullName || !email || !password || !confirm)
      return "All fields are required";

    if (!email.includes("@"))
      return "Invalid email format";

    if (password.length < 8)
      return "Password must be at least 8 characters";

    if (!/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password))
      return "Password must include a number and special character";

    if (password !== confirm)
      return "Passwords do not match";

    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);
      await api.post("/signup/", {
        email,
        full_name: fullName,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.email?.[0] || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <Toast message={error} type="error" />
    </div>
  );
}
