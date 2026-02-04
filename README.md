# Dambulu Furniture Shop Galle

> Premium Handcrafted Furniture Since 1975

A modern, rich UI e-commerce and catalog website for Dambulu Furniture Shop Galle, built with Vue.js 3, PrimeVue, Tailwind CSS, and Express.js.

![Dambulu Furniture](https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80)

## 🏠 About

Dambulu Furniture Shop has been crafting premium furniture in Galle, Sri Lanka since 1975. This website showcases our collection of handcrafted furniture with a modern, user-friendly interface.

**Business Details:**
- 📍 **Address:** No 379, Dangedara, Galle, Sri Lanka
- 📞 **Phone:** +94 77 742 4127
- 🏆 **Established:** 1975 (50+ years of excellence)
- 🛡️ **Warranty:** 10-year comprehensive warranty

## ✨ Features

### Public Website
- **Hero Section** - Eye-catching landing with key value propositions
- **Best Sellers Carousel** - Showcase popular products using PrimeVue Carousel
- **Product Gallery** - Filterable products with PrimeVue DataView
- **Product Details** - High-quality images, specifications, and "Request Quote" modal
- **Categories** - Bedroom Sets, Sofas, Almirahs, Dining Tables, Veranda Chairs, Custom Interior
- **About Us** - Company story, values, and team
- **Contact** - Contact form, map, and FAQ

### Admin Dashboard
- **Product Management** - PrimeVue DataTable with search and filter
- **Add/Edit Products** - Form with FileUpload for images
- **Statistics** - Overview cards with key metrics

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3** - Composition API
- **PrimeVue** - Premium UI component library (Aura theme)
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Express.js** - Node.js web framework
- **Multer** - File upload handling
- **UUID** - Unique ID generation

### Design
- **Theme:** Modern Wood & Minimalist
- **Primary Color:** Deep Oak (#4B3621)
- **Accent Color:** Warm White (#FAF8F5)
- **Font:** Playfair Display (headings) + Inter (body)

## 📁 Project Structure

```
dambulu-furnitures/
├── client/                     # Vue.js Frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── main.css       # Custom styles + Tailwind
│   │   ├── components/
│   │   │   ├── Navbar.vue
│   │   │   ├── Footer.vue
│   │   │   ├── HeroSection.vue
│   │   │   ├── BestSellers.vue
│   │   │   └── QuoteDialog.vue
│   │   ├── views/
│   │   │   ├── HomePage.vue
│   │   │   ├── ProductsPage.vue
│   │   │   ├── ProductPage.vue
│   │   │   ├── AdminPage.vue
│   │   │   ├── AboutPage.vue
│   │   │   └── ContactPage.vue
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.vue
│   │   └── main.js            # Vue setup + PrimeVue config
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express.js Backend
│   ├── data/
│   │   └── products.json      # Mock database
│   ├── uploads/               # Product images
│   ├── server.js              # Express API
│   └── package.json
│
├── package.json               # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd dambulu-furnitures
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   Or install separately:
   ```bash
   # Root dependencies
   npm install
   
   # Client dependencies
   cd client && npm install
   
   # Server dependencies
   cd ../server && npm install
   ```

3. **Start development servers**
   ```bash
   # From root directory - starts both client and server
   npm run dev
   ```
   Or start separately:
   ```bash
   # Terminal 1 - Backend (port 5000)
   cd server && npm run dev
   
   # Terminal 2 - Frontend (port 3000)
   cd client && npm run dev
   ```

4. **Open in browser**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000/api

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/bestsellers` | Get best selling products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/quotes` | Submit quote request |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Health check |

### Query Parameters for GET /api/products
- `category` - Filter by category code
- `search` - Search in name/description
- `sort` - Sort by: `newest`, `price_asc`, `price_desc`, `bestseller`, `rating`

## 🎨 Product Categories

| Category | Code |
|----------|------|
| Bedroom Sets | `bedroom` |
| Sofas | `sofas` |
| Almirahs | `almirahs` |
| Dining Tables | `dining` |
| Veranda Chairs | `veranda` |
| Custom Interior | `custom` |

## 🔐 Admin Access

Access the admin dashboard at `/admin` to:
- View all products in a DataTable
- Add new products with image upload
- Edit existing products
- Delete products
- View statistics

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🏗️ Build for Production

```bash
# Build frontend
cd client && npm run build

# The built files will be in client/dist/
```

## 📄 License

© 2024 Dambulu Furniture Shop Galle. All rights reserved.

---

**Crafted with ❤️ in Sri Lanka**
