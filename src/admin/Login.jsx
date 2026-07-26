import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "neemaisabel@gmail.com", password: "1234" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <h1>TSCO Admin</h1>
          <p>Manage donations, updates, and community programs.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
