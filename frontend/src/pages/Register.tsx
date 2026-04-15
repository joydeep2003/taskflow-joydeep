import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/client";
import { setAuth } from "../auth/auth";
 
const ease = [0.22, 1, 0.36, 1] as const;
 
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
 
  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/register", { name, email, password });
      setAuth(res.data.access_token);
      window.location.href = "/projects";
    } catch {
      setError("Unable to register right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRegister();
  };
 
  return (
    <main className="auth-shell">
      <div className="auth-orb auth-orb--1" />
      <div className="auth-orb auth-orb--2" />
      <div className="auth-orb auth-orb--3" />
 
      {/* Left — form */}
      <motion.section
        className="auth-panel auth-panel--right"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease }}
      >
        <div className="auth-form-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <span className="auth-eyebrow">Get started free</span>
            <h1 className="auth-form-title">Create your<br />workspace</h1>
            <p className="auth-form-sub">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">Sign in →</Link>
            </p>
          </motion.div>
 
          <motion.div
            className="auth-fields"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <div className={`auth-field ${focusedField === "name" ? "focused" : ""} ${name ? "filled" : ""}`}>
              <label className="auth-field-label">Full name</label>
              <div className="auth-field-inner">
                <svg className="auth-field-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2.5 13.5c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  className="auth-input"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
 
            <div className={`auth-field ${focusedField === "email" ? "focused" : ""} ${email ? "filled" : ""}`}>
              <label className="auth-field-label">Work email</label>
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
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
 
            {password && (
              <div className="auth-strength">
                <div className="auth-strength-bars">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`auth-strength-bar ${password.length > i * 3 ? "active" : ""} ${password.length > 9 ? "strong" : password.length > 5 ? "medium" : "weak"}`}
                    />
                  ))}
                </div>
                <span className="auth-strength-label">
                  {password.length > 9 ? "Strong" : password.length > 5 ? "Medium" : "Weak"} password
                </span>
              </div>
            )}
 
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
              onClick={handleRegister}
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  Create account
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </motion.button>
 
            <p className="auth-terms">
              By creating an account you agree to our{" "}
              <a href="#" className="auth-link">Terms of Service</a>
            </p>
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
 
      {/* Right — branding */}
      <motion.aside
        className="auth-panel auth-panel--left"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease, delay: 0.1 }}
      >
        <div className="auth-panel-inner">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-dot" />
            Taskflow
          </Link>
 
          <div className="auth-panel-body">
            <h2 className="auth-panel-headline">
              Ship faster,<br />
              <em>together</em><br />
              as a team.
            </h2>
            <p className="auth-panel-sub">
              Join thousands of teams using Taskflow to manage work with clarity and speed.
            </p>
 
            <div className="auth-features">
              {[
                { icon: "🚀", label: "Instant onboarding" },
                { icon: "🔒", label: "Secure & private" },
                { icon: "💬", label: "Built for collaboration" },
              ].map((f) => (
                <div className="auth-feature-item" key={f.label}>
                  <span className="auth-feature-icon">{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
 
          <div className="auth-social-proof">
            <div className="auth-avatars">
              {["#e85d38","#4b5de4","#f5a623","#22c55e"].map((c, i) => (
                <div key={i} className="auth-mini-avatar" style={{ background: c, marginLeft: i === 0 ? 0 : -8, zIndex: 4 - i }} />
              ))}
            </div>
            <p className="auth-panel-footer">
              Join 2,400+ teams already using Taskflow
            </p>
          </div>
        </div>
      </motion.aside>
    </main>
  );
}