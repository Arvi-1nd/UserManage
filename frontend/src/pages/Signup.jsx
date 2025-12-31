import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Toast from "../components/Toast";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------
  // Client-side validation
  // --------------------
  const validate = () => {
    if (!fullName || !email || !password || !confirm) {
      return "All fields are required";
    }

    if (!email.includes("@")) {
      return "Invalid email format";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return "Password must include a number and special character";
    }

    if (password !== confirm) {
      return "Passwords do not match";
    }

    return null;
  };

  // --------------------
  // Submit handler
  // --------------------
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // ⚠️ IMPORTANT: NO leading slash here
      await api.post("signup/", {
        email,
        full_name: fullName,
        password,
      });

      // Redirect after successful signup
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;

      setError(
        data?.email?.[0] ||
        data?.password?.[0] ||
        data?.detail ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {error && <Toast message={error} type="error" />}
    </div>
  );
}
