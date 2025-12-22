import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  // ✅ Ensure session is ready
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    navigate("/admin/dashboard", { replace: true });
  } else {
    setError("Login succeeded but session not ready. Try again.");
  }

  setLoading(false);
};


  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-brand">
          <h1>Kerala Path</h1>
          <span>Admin Panel</span>
        </div>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="login-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
