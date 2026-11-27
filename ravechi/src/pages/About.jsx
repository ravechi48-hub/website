import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import BrandsMarquee from '../components/BrandsMarquee';

function StatCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const startTime = performance.now();
          const duration = 1600;

          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat__num">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero" aria-labelledby="about-hero-title">
        <div className="container">
          <span className="page-eyebrow">Our Story</span>
          <h1 className="page-hero__title" id="about-hero-title">
            Your Trusted Supply Partner
            <br />
            Since 2007
          </h1>
          <p className="page-hero__sub">
            Your Reliable Partner for Stationery, Office Essentials &amp; Technology Solutions in Gujarat.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="section section--alt">
        <div className="container">
          <div className="stat-row">
            <div className="stat">
              <StatCounter target={17} suffix="+" />
              <span className="stat__label">Years of Experience</span>
            </div>
            <div className="stat">
              <StatCounter target={500} suffix="+" />
              <span className="stat__label">Happy Clients</span>
            </div>
            <div className="stat">
              <StatCounter target={6} suffix="+" />
              <span className="stat__label">Top Brands Stocked</span>
            </div>
            <div className="stat">
              <StatCounter target={1000} suffix="+" />
              <span className="stat__label">Products Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="section" aria-labelledby="about-intro-title">
        <div className="container">
          <div className="about-intro">
            <div>
              <span className="section-label">🏢 Who We Are</span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem,3.5vw,2.5rem)',
                  color: 'var(--clr-brand)',
                  marginBlock: '0.6rem 1rem',
                  letterSpacing: '-.03em'
                }}
                id="about-intro-title"
              >
                About Ravechi Enterprise
              </h2>
              <p style={{ marginBlockEnd: '1rem', color: 'var(--clr-text-muted)', lineHeight: '1.8', fontSize: '0.97rem' }}>
                Ravechi Enterprise Pvt. Ltd. is a trusted name in Vadodara, Gujarat, supplying quality products to schools, universities, corporates and households since 2007.
              </p>
              <p style={{ marginBlockEnd: '1.75rem', color: 'var(--clr-text-muted)', lineHeight: '1.8', fontSize: '0.97rem' }}>
                With a comprehensive product portfolio spanning computers and peripherals, office stationery, toners, printers, digital printing services and housekeeping supplies, Ravechi is a true one-stop shop for all institutional and business supply needs.
              </p>
              <div className="mission-box">
                <p>
                  <strong>Our Mission:</strong> To provide our customers with the best quality products at the right price, with excellent service and timely delivery — making us the most dependable supply partner in the region.
                </p>
              </div>
            </div>

            <div className="about-intro__visual">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', marginBlockEnd: '0.8rem' }}>
                  Your One-Stop Shop for Quality Products &amp; Services
                </h3>
                <p style={{ opacity: 0.88, fontSize: '0.91rem', lineHeight: '1.75', marginBlockEnd: '1.5rem' }}>
                  Serving a wide range of clients including government institutions, private schools, colleges, MNCs and small businesses across Gujarat.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.6rem',
                      padding: '1rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ fontSize: '1.6rem' }}>🎓</div>
                    <div style={{ fontSize: '0.82rem', marginBlockStart: '0.4rem', fontWeight: 600 }}>
                      Schools &amp; Universities
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.6rem',
                      padding: '1rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ fontSize: '1.6rem' }}>🏢</div>
                    <div style={{ fontSize: '0.82rem', marginBlockStart: '0.4rem', fontWeight: 600 }}>
                      Corporates &amp; MNCs
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.6rem',
                      padding: '1rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ fontSize: '1.6rem' }}>🏠</div>
                    <div style={{ fontSize: '0.82rem', marginBlockStart: '0.4rem', fontWeight: 600 }}>
                      Households
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.6rem',
                      padding: '1rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ fontSize: '1.6rem' }}>🏪</div>
                    <div style={{ fontSize: '0.82rem', marginBlockStart: '0.4rem', fontWeight: 600 }}>
                      Small Businesses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section--alt" id="categories" aria-labelledby="cats-title">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">📦 Product Range</span>
            <h2 className="section-title" id="cats-title">Our Product Categories</h2>
            <p className="section-sub">A comprehensive range of products for every business and institutional need.</p>
          </div>
          <div className="categories-grid">
            <div className="cat-card">
              <div className="cat-card__icon">💻</div>
              <h3 className="cat-card__title">Computers &amp; Peripherals</h3>
              <p className="cat-card__desc">Desktops, laptops, keyboards, mice, monitors and IT accessories from leading brands.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">📋</div>
              <h3 className="cat-card__title">Officeware &amp; Stationery</h3>
              <p className="cat-card__desc">Files, folders, pens, paper, notebooks and all office essentials in bulk supply.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">🖨️</div>
              <h3 className="cat-card__title">Toners &amp; Printers</h3>
              <p className="cat-card__desc">Genuine toner cartridges, inkjet refills and printers from top brands.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">🎨</div>
              <h3 className="cat-card__title">Digital Printing Services</h3>
              <p className="cat-card__desc">High-quality digital prints for offices, institutes and businesses of all sizes.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">🧹</div>
              <h3 className="cat-card__title">Housekeeping Supplies</h3>
              <p className="cat-card__desc">Cleaning products, hygiene essentials and facility management supplies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS WE CARRY */}
      <section className="section" aria-labelledby="brands-title2">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">🏆 Authorised Supplier</span>
            <h2 className="section-title" id="brands-title2">Brands We Carry</h2>
            <p className="section-sub">We exclusively stock genuine products from top brands including 3M, Canon, Casio, Camlin, Classmate &amp; Pidilite.</p>
          </div>

          <BrandsMarquee />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section section--alt" aria-labelledby="why-title2">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">⭐ Our Advantage</span>
            <h2 className="section-title" id="why-title2">Why Choose Ravechi?</h2>
            <p className="section-sub">We go beyond just supplying — we build long-term partnerships.</p>
          </div>
          <div className="why-grid">
            <div className="why-card" data-num="✓">
              <div className="why-card__badge" style={{ background: 'linear-gradient(135deg,#43a047,#2e7d32)' }}>✓</div>
              <h3 className="why-card__title">Complete Range Under One Roof</h3>
              <p className="why-card__desc">Save time and money by sourcing all your supply needs from a single trusted vendor.</p>
            </div>
            <div className="why-card" data-num="✓">
              <div className="why-card__badge" style={{ background: 'linear-gradient(135deg,#43a047,#2e7d32)' }}>✓</div>
              <h3 className="why-card__title">17+ Years of Expertise</h3>
              <p className="why-card__desc">Decades of experience means you benefit from deep product knowledge and industry connections.</p>
            </div>
            <div className="why-card" data-num="✓">
              <div className="why-card__badge" style={{ background: 'linear-gradient(135deg,#43a047,#2e7d32)' }}>✓</div>
              <h3 className="why-card__title">Only Genuine Products</h3>
              <p className="why-card__desc">Every product is sourced directly from authorized distributors and manufacturers.</p>
            </div>
            <div className="why-card" data-num="✓">
              <div className="why-card__badge" style={{ background: 'linear-gradient(135deg,#43a047,#2e7d32)' }}>✓</div>
              <h3 className="why-card__title">Ready Stock &amp; Fast Delivery</h3>
              <p className="why-card__desc">Minimal waiting time with large in-stock inventory and prompt delivery across Vadodara.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2 className="cta-banner__title">Partner with Ravechi Today</h2>
              <p className="cta-banner__sub">Call us or leave a message and our team will get back to you promptly.</p>
            </div>
            <div className="cta-banner__actions">
              <a href="tel:+919879116687" className="btn btn--glass">📞 +91 98791 16687</a>
              <Link to="/contact" className="btn btn--primary">Contact Us →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
