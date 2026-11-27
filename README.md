# Ravechi Enterprise — Corporate Website & Product Management Portal

Modern, responsive web platform for **Ravechi Enterprise Pvt. Ltd.** (Sayajigunj, Vadodara, Gujarat), supplying schools, universities, corporates, and households with stationery, computers & peripherals, printers & toners, digital printing, and housekeeping supplies since 2007.

---

## 🏗️ Project Architecture

```text
re/
├── ravechi/                     # Frontend (React + Vite + React Router)
│   ├── public/                  # Static assets & brand logos (3M, Canon, Casio, etc.)
│   ├── src/
│   │   ├── components/          # Header, Footer, BrandsMarquee, etc.
│   │   ├── pages/               # Home, About, Products, UploadProduct, Contact
│   │   ├── App.jsx              # Routes & navigation
│   │   ├── index.css            # Stylesheet with animations & layout
│   │   └── main.jsx             # React entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/                     # Backend (Django 5 + Django REST Framework)
    ├── ravechi_backend/         # Settings, URLs, CORS configuration
    ├── products/                # Models, Serializers, Views & Custom Admin
    │   ├── models.py            # Category, Brand, Product, ProductImage
    │   ├── serializers.py       # DRF serializers
    │   ├── views.py             # ViewSets with search & filters
    │   └── admin.py             # Custom Django Admin with image previews
    ├── seed_data.py             # Database seed script for initial catalog
    └── manage.py
```

---

## 🚀 Getting Started

### 1. Frontend (React + Vite)
```bash
cd ravechi
npm install
npm run dev
```
* The React app will run at: **http://localhost:3000/**
* Build for production: `npm run build`

### 2. Backend (Django REST Framework)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers pillow

# Run migrations & seed data
python manage.py migrate
python seed_data.py

# Start the API server
python manage.py runserver 0.0.0.0:8000
```
* Django REST API: **http://localhost:8000/api/**
* Django Admin Portal: **http://localhost:8000/admin/**
  * Default Admin: `admin` / `admin123`

---

## ✨ Key Features

- **Classy & Animated Design**: Smooth scroll reveals, animated gradient meshes, and subtle hover micro-interactions.
- **Infinite Horizontal Brand Marquee**: Showcases official brand partners (3M, Canon, Casio, Camlin, Classmate, Pidilite) with continuous glide and pause-on-hover.
- **Dynamic Products Catalog**: Real-time keyword search, category filtering, and brand filtering.
- **Instant Product Uploads**: Upload new products with image previews directly from the web app or through Django Admin.
- **Mobile Responsive**: Adaptive navigation, accessible focus states, and responsive layouts across all screen sizes.
