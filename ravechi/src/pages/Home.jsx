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

export default function Home() {
  return (
    <main id="main">
      {/* ── HERO ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true"></div>
        <div className="hero__orb hero__orb--1" aria-hidden="true"></div>
        <div className="hero__orb hero__orb--2" aria-hidden="true"></div>
        <div className="hero__orb hero__orb--3" aria-hidden="true"></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBlock: '7rem 5rem' }}>
          <div className="hero__inner" style={{ paddingBlock: 0 }}>
            <div className="hero__content">
              <span className="hero__eyebrow">Trusted Since 2007</span>
              <h1 className="hero__title" id="hero-title">
                Where <span className="accent">Quality</span>
                <br />
                Meets <span className="accent-cyan">Convenience!</span>
              </h1>
              <p className="hero__subtitle">
                Your one-stop supply partner for schools, universities, corporates &amp; households across Vadodara and Gujarat.
              </p>
              <div className="hero__actions">
                <Link to="/contact" className="btn btn--primary">
                  📞 Request a Callback
                </Link>
                <Link to="/about" className="btn btn--glass">
                  Discover More →
                </Link>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="hero-card">
                <span className="hero-card__icon">💻</span>
                <span className="hero-card__label">Computers &amp; Peripherals</span>
              </div>
              <div className="hero-card hero-card--accent">
                <span className="hero-card__icon">🖨️</span>
                <span className="hero-card__label">Printers &amp; Toners</span>
              </div>
              <div className="hero-card hero-card--cyan">
                <span className="hero-card__icon">📎</span>
                <span className="hero-card__label">Office Stationery</span>
              </div>
              <div className="hero-card">
                <span className="hero-card__icon">🧹</span>
                <span className="hero-card__label">Housekeeping Supplies</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ── USP TICKER ── */}
      <div className="usp-strip" role="region" aria-label="Key highlights">
        <div className="usp-strip__track" aria-hidden="true">
          <span className="usp-strip__item"><span className="usp-strip__icon">🏪</span> One-Stop Solution</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">📅</span> Trusted Since 2007</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">🏆</span> Top Genuine Brands</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">⚡</span> Immediate Availability</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">🤝</span> Customer-Centric Service</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">📦</span> Bulk &amp; Institutional Orders</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">🎨</span> Digital Printing Services</span>
          <span className="usp-strip__sep">✦</span>
          {/* duplicate for seamless loop */}
          <span className="usp-strip__item"><span className="usp-strip__icon">🏪</span> One-Stop Solution</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">📅</span> Trusted Since 2007</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">🏆</span> Top Genuine Brands</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">⚡</span> Immediate Availability</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">🤝</span> Customer-Centric Service</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">📦</span> Bulk &amp; Institutional Orders</span>
          <span className="usp-strip__sep">✦</span>
          <span className="usp-strip__item"><span className="usp-strip__icon">🎨</span> Digital Printing Services</span>
          <span className="usp-strip__sep">✦</span>
        </div>
      </div>

      {/* ── PRODUCT CATEGORIES ── */}
      <section className="section" aria-labelledby="cats-title">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">📦 What We Offer</span>
            <h2 className="section-title" id="cats-title">Our Product Categories</h2>
            <p className="section-sub">
              Supplying quality products to schools, universities, corporates &amp; households across Gujarat.
            </p>
          </div>
          <div className="categories-grid">
            <div className="cat-card">
              <div className="cat-card__icon">💻</div>
              <h3 className="cat-card__title">Computers &amp; Peripherals</h3>
              <p className="cat-card__desc">Desktops, laptops, keyboards, mice, monitors and IT accessories from leading brands.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">📋</div>
              <h3 className="cat-card__title">Office Stationery</h3>
              <p className="cat-card__desc">Files, folders, pens, paper, notebooks and all office essentials in bulk supply.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">🖨️</div>
              <h3 className="cat-card__title">Toners &amp; Printers</h3>
              <p className="cat-card__desc">Genuine toner cartridges, inkjet refills and printers from Canon, HP, Epson, Ricoh &amp; more.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">🎨</div>
              <h3 className="cat-card__title">Digital Printing</h3>
              <p className="cat-card__desc">High-quality digital prints for offices, institutes and businesses of all sizes.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">🧹</div>
              <h3 className="cat-card__title">Housekeeping Supplies</h3>
              <p className="cat-card__desc">Cleaning products, hygiene essentials and facility management supplies.</p>
            </div>
            <div className="cat-card">
              <div className="cat-card__icon">📚</div>
              <h3 className="cat-card__title">Books &amp; Stationery</h3>
              <p className="cat-card__desc">School and college books, art supplies and educational stationery in bulk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS WE SUPPLY (HORIZONTAL MOTION) ── */}
      <section className="section section--alt" aria-labelledby="brands-title">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">🏆 Authorised Supplier</span>
            <h2 className="section-title" id="brands-title">Brands We Supply</h2>
            <p className="section-sub">
              We stock and supply 100% genuine products from India's most trusted brands including 3M, Canon, Casio, Camlin, Classmate &amp; Pidilite.
            </p>
          </div>

          <BrandsMarquee />
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="section" aria-labelledby="why-title">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">⭐ Our Advantage</span>
            <h2 className="section-title" id="why-title">Why Choose Ravechi Enterprise?</h2>
            <p className="section-sub">Over 17 years of trusted service to hundreds of institutions and businesses across Gujarat.</p>
          </div>
          <div className="why-grid">
            <div className="why-card" data-num="01">
              <div className="why-card__badge">1</div>
              <h3 className="why-card__title">One-Stop Shop</h3>
              <p className="why-card__desc">From computers and printers to stationery and cleaning supplies — everything under one roof, reducing procurement overhead.</p>
            </div>
            <div className="why-card" data-num="02">
              <div className="why-card__badge">2</div>
              <h3 className="why-card__title">Trusted Since 2007</h3>
              <p className="why-card__desc">Nearly two decades of experience supplying schools, universities, corporate offices and households across Gujarat.</p>
            </div>
            <div className="why-card" data-num="03">
              <div className="why-card__badge">3</div>
              <h3 className="why-card__title">Only Genuine Brands</h3>
              <p className="why-card__desc">We supply 100% genuine products from 3M, Canon, Casio, Camlin, Classmate, Pidilite and other reputed manufacturers.</p>
            </div>
            <div className="why-card" data-num="04">
              <div className="why-card__badge">4</div>
              <h3 className="why-card__title">Immediate Availability</h3>
              <p className="why-card__desc">Most items in stock for immediate dispatch — your operations never face a supply delay.</p>
            </div>
            <div className="why-card" data-num="05">
              <div className="why-card__badge">5</div>
              <h3 className="why-card__title">Customer-Centric</h3>
              <p className="why-card__desc">Personalised service, transparent pricing and long-term relationships — your satisfaction is our priority.</p>
            </div>
            <div className="why-card" data-num="06">
              <div className="why-card__badge">6</div>
              <h3 className="why-card__title">Bulk &amp; Custom Orders</h3>
              <p className="why-card__desc">Competitive pricing for bulk institutional orders with customised supply schedules as per your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section section--alt" aria-labelledby="stats-title">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">📊 By The Numbers</span>
            <h2 className="section-title" id="stats-title">Our Track Record</h2>
          </div>
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

      {/* ── TESTIMONIALS ── */}
      <section className="section" aria-labelledby="test-title">
        <div className="container">
          <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
            <span className="section-label">💬 Client Stories</span>
            <h2 className="section-title" id="test-title">What Our Clients Say</h2>
            <p className="section-sub">Trusted by institutions and businesses across Vadodara and Gujarat.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-card__quote">
                Ravechi has been our go-to supplier for all office stationery and printer consumables for many years. Reliable, genuine products and prompt delivery every time.
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">R</div>
                <div>
                  <div className="testimonial-card__name">Rajiv Mehta</div>
                  <div className="testimonial-card__role">Purchase Manager, Corporate Office, Vadodara</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-card__quote">
                We source all our computer peripherals and toner cartridges from Ravechi. Excellent stock availability and the team is very responsive to our requirements.
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">P</div>
                <div>
                  <div className="testimonial-card__name">Priya Shah</div>
                  <div className="testimonial-card__role">Administrative Head, Educational Institution</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-card__quote">
                What sets Ravechi apart is their personalised service. They understand our bulk needs and always deliver on time, with quality products at fair prices.
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">A</div>
                <div>
                  <div className="testimonial-card__name">Amit Patel</div>
                  <div className="testimonial-card__role">Procurement Officer, University, Vadodara</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section section--alt" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2 className="cta-banner__title" id="cta-title">Ready to place an order?</h2>
              <p className="cta-banner__sub">Call us or fill in a quick form — we'll get back to you within hours.</p>
            </div>
            <div className="cta-banner__actions">
              <a href="tel:+919879116687" className="btn btn--glass">📞 +91 98791 16687</a>
              <Link to="/contact" className="btn btn--primary">Send a Message →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
