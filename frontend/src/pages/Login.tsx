import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/client";
import { setAuth } from "../auth/auth";
 
const ease = [0.22, 1, 0.36, 1] as const;
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
 
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/login", { email, password });
      setAuth(res.data.access_token);
      window.location.href = "/projects";
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };
 
  return (
    <main className="auth-shell">
      {/* Background orbs */}
      <div className="auth-orb auth-orb--1" />
      <div className="auth-orb auth-orb--2" />
      <div className="auth-orb auth-orb--3" />
 
      {/* Left panel — branding */}
      <motion.aside
        className="auth-panel auth-panel--left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease }}
      >
        <div className="auth-panel-inner">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-dot" />
            Taskflow
          </Link>
 
          <div className="auth-panel-body">
            <h2 className="auth-panel-headline">
              Your work,<br />
              <em>beautifully</em><br />
              organized.
            </h2>
            <p className="auth-panel-sub">
              Manage projects, track tasks and ship with your team — all in one place.
            </p>
 
            <div className="auth-features">
              {[
                { icon: "⚡", label: "Realtime dashboards" },
                { icon: "🎯", label: "Kanban task boards" },
                { icon: "✦",  label: "Modern, focused UI" },
              ].map((f) => (
                <div className="auth-feature-item" key={f.label}>
                  <span className="auth-feature-icon">{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
 
          <p className="auth-panel-footer">
            Trusted by teams shipping faster every day.
          </p>
        </div>
      </motion.aside>
 
      {/* Right panel — form */}
      <motion.section
        className="auth-panel auth-panel--right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease, delay: 0.1 }}
      >
        <div className="auth-form-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <span className="auth-eyebrow">Welcome back</span>
            <h1 className="auth-form-title">Sign in to your<br />workspace</h1>
            <p className="auth-form-sub">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">Create one free →</Link>
            </p>
          </motion.div>
 
          <motion.div
            className="auth-fields"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
          >
            <div className={`auth-field ${focusedField === "email" ? "focused" : ""} ${email ? "filled" : ""}`}>
              <label className="auth-field-label">Email address</label>
              <div className="auth-field-inner">
                <svg className="auth-field-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
 
            <div className={`auth-field ${focusedField === "password" ? "focused" : ""} ${password ? "filled" : ""}`}>
              <label className="auth-field-label">Password</label>
              <div className="auth-field-inner">
                <svg className="auth-field-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
                </svg>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
 
            {error && (
              <motion.p
                className="auth-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="7" cy="10" r="0.7" fill="currentColor"/>
                </svg>
                {error}
              </motion.p>
            )}
 
            <motion.button
              className="auth-submit-btn"
              onClick={handleLogin}
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  Sign in
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
 
          <motion.p
            className="auth-footer-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/">← Back to home</Link>
          </motion.p>
        </div>
      </motion.section>
    </main>
  );
}