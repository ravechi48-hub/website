import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function UploadProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    sku: '',
    price: '',
    is_quote_only: true,
    in_stock: true,
    description: '',
    specifications: ''
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/categories/`).then((r) => r.json()),
      fetch(`${API_BASE}/brands/`).then((r) => r.json())
    ])
      .then(([catData, brandData]) => {
        setCategories(catData || []);
        setBrands(brandData || []);
        if (catData?.length > 0) {
          setFormData((prev) => ({ ...prev, category: catData[0].id }));
        }
        setLoadingFilters(false);
      })
      .catch((err) => {
        console.error('Error fetching dropdowns:', err);
        setLoadingFilters(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryImages(files);
      const previews = files.map((f) => URL.createObjectURL(f));
      setGalleryPreviews(previews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      if (formData.brand) data.append('brand', formData.brand);
      if (formData.sku) data.append('sku', formData.sku);
      if (formData.price) data.append('price', formData.price);
      data.append('is_quote_only', formData.is_quote_only);
      data.append('in_stock', formData.in_stock);
      data.append('description', formData.description);
      data.append('specifications', formData.specifications);

      if (mainImage) {
        data.append('image', mainImage);
      }

      galleryImages.forEach((file) => {
        data.append('gallery_files', file);
      });

      const response = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      setSuccess(true);
      setSubmitting(false);
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (err) {
      console.error('Upload error:', err);
      setErrorMsg(`Failed to upload product. Details: ${err.message}`);
      setSubmitting(false);
    }
  };

  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero" aria-labelledby="upload-hero-title">
        <div className="container">
          <span className="page-eyebrow">Inventory Management</span>
          <h1 className="page-hero__title" id="upload-hero-title">
            Upload New Product
          </h1>
          <p className="page-hero__sub">
            Add items to Ravechi Enterprise's catalog. Products are stored in the Django backend and automatically listed in real time.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="section" style={{ paddingBlock: '3rem 5rem' }}>
        <div className="container">
          <div className="upload-card">
            {success && (
              <div
                style={{
                  background: '#e8f5e9',
                  border: '1px solid #81c784',
                  color: '#2e7d32',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem',
                  fontWeight: 600
                }}
              >
                🎉 Product uploaded successfully! Redirecting to products catalog…
              </div>
            )}

            {errorMsg && (
              <div
                style={{
                  background: '#ffebee',
                  border: '1px solid #e57373',
                  color: '#c62828',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem'
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-row">
                <label htmlFor="name">
                  Product Name <span style={{ color: '#c0392b' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Canon imageCLASS MF3010 Multifunction Laser Printer"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-row">
                  <label htmlFor="category">
                    Category <span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={loadingFilters}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="brand">Brand</label>
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    disabled={loadingFilters}
                  >
                    <option value="">No brand / Generic</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-row">
                  <label htmlFor="sku">SKU / Product Code</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. CAN-MF3010"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="price">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={formData.is_quote_only}
                    placeholder={formData.is_quote_only ? 'Quote on request' : '0.00'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', marginBlock: '0.5rem 1.25rem' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    name="is_quote_only"
                    checked={formData.is_quote_only}
                    onChange={handleChange}
                    style={{ inlineSize: 'auto' }}
                  />
                  Display as "Quote on Request"
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    name="in_stock"
                    checked={formData.in_stock}
                    onChange={handleChange}
                    style={{ inlineSize: 'auto' }}
                  />
                  In Stock / Ready for Dispatch
                </label>
              </div>

              {/* Main Image Upload */}
              <div className="form-row">
                <label>Primary Product Image</label>
                <div className="upload-dropzone" onClick={() => document.getElementById('main-image-input').click()}>
                  <input
                    type="file"
                    id="main-image-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleMainImageChange}
                  />
                  {mainImagePreview ? (
                    <div>
                      <img
                        src={mainImagePreview}
                        alt="Preview"
                        style={{ maxHeight: '140px', objectFit: 'contain', margin: '0 auto 0.5rem', borderRadius: 'var(--radius-sm)' }}
                      />
                      <p style={{ fontSize: '0.82rem', color: 'var(--clr-brand-mid)' }}>Click to replace image</p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>📷</div>
                      <p style={{ fontWeight: 600, color: 'var(--clr-brand)' }}>Click to upload product image</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Gallery Images */}
              <div className="form-row">
                <label>Additional Gallery Images (Optional)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryImagesChange}
                />
                {galleryPreviews.length > 0 && (
                  <div className="preview-container">
                    {galleryPreviews.map((src, i) => (
                      <img key={i} src={src} alt={`Gallery ${i}`} className="image-preview-thumb" />
                    ))}
                  </div>
                )}
              </div>

              <div className="form-row">
                <label htmlFor="description">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of features, benefits and recommended applications…"
                />
              </div>

              <div className="form-row">
                <label htmlFor="specifications">Technical Specifications (One per line)</label>
                <textarea
                  id="specifications"
                  name="specifications"
                  rows={3}
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder="Print Speed: 18 ppm&#10;Connectivity: Wi-Fi, USB 2.0&#10;Warranty: 1 Year Onsite"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={submitting}
                  style={{ flex: 1, justifyContent: 'center', paddingBlock: '0.85rem' }}
                >
                  {submitting ? 'Uploading to Django…' : '🚀 Save & Publish Product'}
                </button>
                <Link to="/products" className="btn btn--outline">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
