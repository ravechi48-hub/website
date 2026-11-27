import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    // Fetch categories and brands
    Promise.all([
      fetch(`${API_BASE}/categories/`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_BASE}/brands/`).then((r) => (r.ok ? r.json() : []))
    ])
      .then(([catData, brandData]) => {
        setCategories(catData || []);
        setBrands(brandData || []);
      })
      .catch((err) => console.error('Failed to load filters:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = `${API_BASE}/products/?search=${encodeURIComponent(search)}`;
    if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
    if (selectedBrand) url += `&brand=${encodeURIComponent(selectedBrand)}`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : { results: [] }))
      .then((data) => {
        setProducts(data.results || data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [search, selectedCategory, selectedBrand]);

  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero" aria-labelledby="products-hero-title">
        <div className="container">
          <span className="page-eyebrow">Product Catalog</span>
          <h1 className="page-hero__title" id="products-hero-title">
            Our Products &amp; Supplies
          </h1>
          <p className="page-hero__sub">
            Browse our wide selection of computers, office stationery, toners, printing solutions &amp; housekeeping supplies.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/upload" className="btn btn--primary">
              ➕ Upload New Product
            </Link>
            <a
              href="http://localhost:8000/admin/"
              target="_blank"
              rel="noreferrer"
              className="btn btn--glass"
            >
              ⚙️ Open Django Admin (admin / admin123)
            </a>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH SECTION */}
      <section className="section" style={{ paddingBlock: '3rem 5rem' }}>
        <div className="container">
          {/* Search bar */}
          <div style={{ maxWidth: '36rem', margin: '0 auto 2rem' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title, SKU, or keyword…"
              style={{
                width: '100%',
                padding: '0.85rem 1.4rem',
                fontSize: '1rem',
                borderRadius: '999px',
                border: '1.5px solid var(--clr-border)',
                outline: 'none',
                background: '#fff',
                boxShadow: '0 4px 16px rgba(10,36,99,0.06)'
              }}
            />
          </div>

          {/* Category Filter Chips */}
          <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--clr-text-muted)', letterSpacing: '0.08em' }}>
              Filter by Category
            </span>
          </div>
          <div className="product-filters" style={{ justifyContent: 'center' }}>
            <button
              type="button"
              className={`filter-chip ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-chip ${selectedCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
              >
                {cat.icon && `${cat.icon} `}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Brand Filter Chips */}
          {brands.length > 0 && (
            <>
              <div style={{ textAlign: 'center', margin: '1.25rem 0 0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--clr-text-muted)', letterSpacing: '0.08em' }}>
                  Filter by Brand
                </span>
              </div>
              <div className="product-filters" style={{ justifyContent: 'center' }}>
                <button
                  type="button"
                  className={`filter-chip ${selectedBrand === '' ? 'active' : ''}`}
                  onClick={() => setSelectedBrand('')}
                >
                  All Brands
                </button>
                {brands.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`filter-chip ${selectedBrand === b.slug ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(selectedBrand === b.slug ? '' : b.slug)}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Product Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--clr-text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
              <p>Loading products from Django backend…</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--clr-surface)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📦</div>
              <h3 style={{ color: 'var(--clr-brand)', marginBottom: '0.5rem' }}>No products found</h3>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>
                Try adjusting your search terms or filters, or upload a new product.
              </p>
              <Link to="/upload" className="btn btn--primary">
                Upload a Product →
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-card__image-wrap">
                    {p.image ? (
                      <img
                        src={p.image.startsWith('http') ? p.image : `http://127.0.0.1:8000${p.image}`}
                        alt={p.name}
                        className="product-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <span className="product-card__placeholder">
                        {p.category_name?.includes('Computer')
                          ? '💻'
                          : p.category_name?.includes('Printer')
                          ? '🖨️'
                          : p.category_name?.includes('Stationery')
                          ? '📋'
                          : '📦'}
                      </span>
                    )}

                    {p.brand_name && (
                      <span className="product-card__badge-brand">
                        {p.brand_name}
                      </span>
                    )}
                  </div>

                  <div className="product-card__body">
                    <span className="product-card__category">{p.category_name}</span>
                    <h3 className="product-card__title">{p.name}</h3>
                    {p.sku && <span className="product-card__sku">SKU: {p.sku}</span>}
                    {p.description && <p className="product-card__desc">{p.description}</p>}

                    <div className="product-card__footer">
                      <div>
                        {p.is_quote_only || !p.price ? (
                          <span className="product-card__quote-tag">Quote on Request</span>
                        ) : (
                          <span className="product-card__price">₹{Number(p.price).toLocaleString('en-IN')}</span>
                        )}
                      </div>

                      <Link
                        to={`/contact?subject=quote&product=${encodeURIComponent(p.name)}`}
                        className="btn btn--outline"
                        style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
