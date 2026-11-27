import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="site-header">
        <div className="container">
          <div className="header-inner" id="header-inner">
            <Link to="/" className="site-logo" aria-label="Ravechi Enterprise – Home">
              <img
                className="site-logo__img"
                src="/logo.jpg"
                alt="Ravechi Enterprise logo"
                width="56"
                height="56"
              />
              <div className="site-logo__text-wrap">
                <span className="site-logo__name">Ravechi Enterprise</span>
                <span className="site-logo__sub">Pvt. Ltd.</span>
              </div>
            </Link>

            <nav className="site-nav" aria-label="Primary">
              <button
                className="menu-button"
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
              >
                <svg
                  className="menu-icon"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  {menuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
                <span>{menuOpen ? 'Close' : 'Menu'}</span>
              </button>

              <ul
                id="site-menu"
                className={`site-menu ${menuOpen ? 'is-open' : ''}`}
                role="list"
              >
                <li>
                  <NavLink
                    to="/"
                    end
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-cta-item">
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn--primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Get a Quote ↗
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
