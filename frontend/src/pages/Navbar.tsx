import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../auth/auth";
 
type NavbarProps = {
  userName?: string;
};
 
export default function Navbar({ userName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("tf-theme") === "dark");
  const location = useLocation();
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("tf-theme", dark ? "dark" : "light");
  }, [dark]);
 
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };
 
  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "TF";
 
  return (
    <motion.nav
      className={`tf-navbar ${scrolled ? "tf-navbar--scrolled" : ""}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/projects" className="tf-navbar-logo">
        <span className="tf-navbar-dot" />
        <span className="tf-navbar-brand">Taskflow</span>
      </Link>
 
      <div className="tf-navbar-links">
        <Link
          to="/projects"
          className={`tf-navbar-link ${location.pathname === "/projects" ? "active" : ""}`}
        >
          Projects
        </Link>
      </div>
 
      <div className="tf-navbar-right">
        {/* Theme toggle */}
        <motion.button
          className="tf-theme-toggle"
          onClick={() => setDark((v) => !v)}
          whileTap={{ scale: 0.88 }}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span key="sun" initial={{ rotate: -80, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 80, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.span>
            ) : (
              <motion.span key="moon" initial={{ rotate: 80, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -80, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 9.5A5.5 5.5 0 016.5 2.5c-.3 0-.6 0-.9.04A5.5 5.5 0 108 13.5a5.5 5.5 0 005.5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
 
        {/* Profile */}
        <button className="tf-profile-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Profile menu">
          <span className="tf-avatar">{initials}</span>
          {userName && <span className="tf-profile-name">{userName}</span>}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`tf-chevron ${menuOpen ? "open" : ""}`}>
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
 
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="tf-profile-menu"
              initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <div className="tf-profile-menu-header">
                <span className="tf-avatar tf-avatar--lg">{initials}</span>
                <div>
                  <p className="tf-profile-menu-name">{userName || "User"}</p>
                  <p className="tf-profile-menu-role">Workspace member</p>
                </div>
              </div>
              <div className="tf-profile-menu-divider" />
              <button className="tf-profile-menu-item" onClick={() => { setDark((v) => !v); setMenuOpen(false); }}>
                {dark ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5A5.5 5.5 0 016.5 2.5c-.3 0-.6 0-.9.04A5.5 5.5 0 108 13.5a5.5 5.5 0 005.5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                )}
                {dark ? "Light mode" : "Dark mode"}
              </button>
              <div className="tf-profile-menu-divider" />
              <button className="tf-profile-menu-item" onClick={handleLogout}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M5.5 3H3a1 1 0 00-1 1v7a1 1 0 001 1h2.5M9.5 10l3-2.5L9.5 5M12.5 7.5H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}