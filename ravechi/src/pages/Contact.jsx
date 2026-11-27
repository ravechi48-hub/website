import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 800);
  };

  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero" aria-labelledby="contact-hero-title">
        <div className="container">
          <span className="page-eyebrow">Get in Touch</span>
          <h1 className="page-hero__title" id="contact-hero-title">Contact Ravechi Enterprise</h1>
          <p className="page-hero__sub">We're here to help. Reach out for quotes, bulk orders, or any supply enquiry.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <h2 className="section-title" id="contact-title" style={{ textAlign: 'left', marginBlockEnd: '1.5rem' }}>
                Get in Touch
              </h2>

              <div className="contact-info__item">
                <div className="contact-info__icon" aria-hidden="true">📍</div>
                <div>
                  <div className="contact-info__label">Our Address</div>
                  <div className="contact-info__value">
                    GF - 14/15, Silver Line Complex,
                    <br />
                    Opp. BBC Tower, Sayajigunj,
                    <br />
                    Vadodara - 390005, Gujarat, India
                  </div>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon" aria-hidden="true">📞</div>
                <div>
                  <div className="contact-info__label">Phone Numbers</div>
                  <div className="contact-info__value">
                    <a href="tel:+919879116687">+91 98791 16687</a>
                    <br />
                    <a href="tel:+919925882250">+91 99258 82250</a>
                    <br />
                    <a href="tel:+919925882255">+91 99258 82255</a>
                  </div>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon" aria-hidden="true">✉️</div>
                <div>
                  <div className="contact-info__label">Email Address</div>
                  <div className="contact-info__value">
                    <a href="mailto:ravechi53@gmail.com">ravechi53@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon" aria-hidden="true">🕐</div>
                <div>
                  <div className="contact-info__label">Business Hours</div>
                  <div className="contact-info__value">
                    Monday – Saturday: 10:00 AM – 7:00 PM
                    <br />
                    Sunday: Closed
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="map-wrap" aria-label="Map showing Ravechi Enterprise location in Sayajigunj, Vadodara">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.185!3d22.308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf0000000001%3A0x1!2sSayajigunj%2C+Vadodara%2C+Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ravechi Enterprise location map"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-card" id="contact-form-wrap">
              <h2 className="form-title">Send Us a Message</h2>

              {submitted && (
                <div className="form-success visible" role="alert" aria-live="polite">
                  ✅ Thank you! We've received your message and will get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <label htmlFor="name">
                    Full Name <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder="Your full name"
                    aria-required="true"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="email">
                    Email Address <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    aria-required="true"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="subject">
                    Subject <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  >
                    <option value="" disabled>Select a subject…</option>
                    <option value="quote">Request a Quote</option>
                    <option value="bulk">Bulk / Institutional Order</option>
                    <option value="computers">Computers &amp; Peripherals</option>
                    <option value="stationery">Stationery &amp; Office Essentials</option>
                    <option value="toners">Toners &amp; Printers</option>
                    <option value="printing">Digital Printing Services</option>
                    <option value="housekeeping">Housekeeping Supplies</option>
                    <option value="other">Other Enquiry</option>
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="message">
                    Message <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    placeholder="Please describe your requirement or query…"
                    aria-required="true"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={submitting}
                  style={{ inlineSize: '100%', justifyContent: 'center', paddingBlock: '0.75rem' }}
                >
                  {submitting ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CALL CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2 className="cta-banner__title">Prefer to call directly?</h2>
              <p className="cta-banner__sub">Our team is available Monday–Saturday, 10 AM to 7 PM.</p>
            </div>
            <div className="cta-banner__actions">
              <a href="tel:+919879116687" className="btn btn--glass">📞 +91 98791 16687</a>
              <a href="tel:+919925882250" className="btn btn--primary">+91 99258 82250</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
