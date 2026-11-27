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

  return (
    <header className={`site-header is-wide ${scrolled ? 'scrolled' : ''}`} id="site-header">
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
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="menu-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
              style={menuOpen ? { display: 'flex', opacity: 1, position: 'fixed', top: '5rem', right: '1rem' } : {}}
              role="list"
            >
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Contact
                </NavLink>
              </li>
              <li style={{ marginInlineStart: '0.5rem' }}>
                <Link to="/contact" className="btn btn--primary">
                  Get a Quote ↗
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
