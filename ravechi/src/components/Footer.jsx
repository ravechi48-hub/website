import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              to="/"
              aria-label="Ravechi Enterprise home"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
            >
              <img
                className="footer-logo-img"
                src="/logo.jpg"
                alt=""
                aria-hidden="true"
              />
              <div>
                <div className="footer-logo-name">Ravechi Enterprise</div>
                <div className="footer-logo-sub">Pvt. Ltd.</div>
              </div>
            </Link>
            <p className="footer-brand__desc">
              Your one-stop supply partner for quality stationery, office essentials &amp; technology solutions since 2007.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col__title">Navigation</h3>
            <ul className="footer-col__list" role="list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/contact">Get a Quote</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col__title">Products</h3>
            <ul className="footer-col__list" role="list">
              <li>
                <Link to="/about#categories">Computers &amp; Peripherals</Link>
              </li>
              <li>
                <Link to="/about#categories">Office Stationery</Link>
              </li>
              <li>
                <Link to="/about#categories">Toners &amp; Printers</Link>
              </li>
              <li>
                <Link to="/about#categories">Digital Printing</Link>
              </li>
              <li>
                <Link to="/about#categories">Housekeeping Supplies</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col__title">Contact</h3>
            <div className="footer-contact-line">
              <span aria-hidden="true">📍</span>
              <span>GF - 14/15, Silver Line Complex, Opp. BBC Tower, Sayajigunj, Vadodara - 390005, Gujarat, India</span>
            </div>
            <div className="footer-contact-line">
              <span aria-hidden="true">📞</span>
              <div>
                <a href="tel:+919879116687">+91 98791 16687</a>
                <br />
                <a href="tel:+919925882250">+91 99258 82250</a>
                <br />
                <a href="tel:+919925882255">+91 99258 82255</a>
              </div>
            </div>
            <div className="footer-contact-line">
              <span aria-hidden="true">✉️</span>
              <a href="mailto:ravechi53@gmail.com">ravechi53@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-wrap">
          <div className="footer-bottom">
            <span>© {currentYear} Ravechi Enterprise Pvt. Ltd. All rights reserved.</span>
            <span>Sayajigunj, Vadodara, Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
