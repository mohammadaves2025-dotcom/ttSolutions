<div align="center">

# T&T Office Solutions

**Full-stack website for T&T Office Solutions** — a Delhi-based supplier of office equipment (document shredders, laminators, and related machines), built as a MERN application with an admin panel for managing products, blog content, and site settings.

🔗 **Live site:** [ttofficesolutions.in](https://www.ttofficesolutions.in)

</div>

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18 (Vite), React Router, Lucide icons, `@uiw/react-md-editor` for the blog editor |
| Backend | Node.js + Express (ES modules), Mongoose / MongoDB Atlas |
| Auth | JWT-based admin authentication (`bcryptjs` for password hashing) |
| Media | Cloudinary (product & blog images) |
| Security | Helmet, CORS allow-list, rate limiting (`express-rate-limit`) on `/api` and `/api/auth` |
| Hosting | Vercel (frontend and backend deployed as separate projects) |

## Project structure

```
tanveer-fixed/
├── frontend/                 # React + Vite app
│   └── src/
│       ├── components/       # Navbar, Footer, Carousel, ProductSection, EnquiryButton, etc.
│       ├── pages/             # Home, Products, ProductDetail, Blog, Support, About, Contact,
│       │                       Admin* (dashboard, login, edit product/blog, settings)
│       ├── context/           # Auth context for the admin panel
│       ├── services/          # API client
│       └── hooks/             # Shared hooks (e.g. scroll-reveal animations)
│
└── backend/                  # Express API
    ├── routes/                # auth, products, blogs, settings, upload, seed
    ├── models/                # User, Product, Blog, SiteSettings (Mongoose schemas)
    ├── middleware/             # auth (JWT), ensureDB (serverless connection guard), errorHandler
    ├── config/                 # MongoDB and Cloudinary connection setup
    └── server.js                # Express app entry point
```

## Getting started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (Atlas or local)
- A Cloudinary account (for image uploads)

### 1. Clone and install

```bash
git clone https://github.com/mohammadaves2025-dotcom/ttSolutions.git
cd ttSolutions/tanveer-fixed

cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment variables

**`backend/.env`**

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret
JWT_EXPIRES_IN=7d

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Default admin account (seeded on first login attempt if none exists)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_this_before_deploying
ADMIN_RESET_SECRET=a_separate_secret_for_the_password-reset_endpoint

# Optional
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
NODE_ENV=development
PORT=5000
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run locally

```bash
# Terminal 1 — backend
cd backend
npm run dev        # nodemon, http://localhost:5000

# Terminal 2 — frontend
cd frontend
npm run dev         # Vite dev server, http://localhost:5173
```

## API overview

All routes are prefixed with `/api`. Admin-only routes require a `Bearer` JWT from `/api/auth/login`.

| Route | Description |
|---|---|
| `POST /api/auth/login` | Admin login |
| `GET/PUT /api/auth/me` | Get/update current admin profile |
| `POST /api/auth/reset-password` | Password reset (requires `ADMIN_RESET_SECRET`) |
| `GET /api/products` · `GET /api/products/:id` | List / fetch products |
| `POST/PUT/DELETE /api/products/:id` | Manage products *(admin)* |
| `GET /api/blogs` · `GET /api/blogs/:id` | List / fetch blog posts |
| `POST/PUT/DELETE /api/blogs/:id` | Manage blog posts *(admin)* |
| `GET/PUT /api/settings` | Site-wide settings (branding, contact info, etc.) |
| `POST /api/upload` | Cloudinary image upload |

## Deployment

Both `frontend/` and `backend/` are deployed independently on Vercel (each has its own `vercel.json`). The backend also has a `vercel-build` no-op script since it ships as a plain Express serverless function — no separate build step is needed.

Remember to set all the environment variables above in each Vercel project's dashboard; they are **not** committed to the repo.

## Admin panel

The admin dashboard (`/admin`) allows managing:
- Products (create/edit/delete, organized by brand and category)
- Blog posts (rich Markdown editor)
- Site settings (contact details, branding)

Default credentials are controlled via `ADMIN_USERNAME` / `ADMIN_PASSWORD` — **change these before deploying to production.**

---

<div align="center">
<sub>Built and maintained by Aves</sub>
</div>
