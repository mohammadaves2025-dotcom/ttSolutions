# T&T Office Solutions — Production-Ready Rewrite

A full-stack website for T&T Office Solutions, completely rewritten with modern **ES Modules (`import`/`export`)** throughout.

---

## What Changed from v2

### Backend
| Area | Before | After |
|------|--------|-------|
| Module system | `require()` / CommonJS | `import` / ES Modules (`"type": "module"`) |
| Authentication | Plain SHA-256 HMAC token, plaintext passwords | `jsonwebtoken` JWT + `bcryptjs` password hashing |
| Admin route protection | None | `protect` middleware checks Bearer token on every write |
| Error handling | Inline try/catch in every route | `asyncHandler` wrapper + `globalErrorHandler` middleware |
| Rate limiting | None | `express-rate-limit` — 200 req/15 min globally, 20 for auth |
| Security headers | None | `helmet` |
| HTTP logging | None | `morgan` |
| Password storage | Plaintext | bcrypt (12 rounds) |
| Seed route | Unprotected POST | Protected — requires valid admin JWT |

### Frontend
| Area | Before | After |
|------|--------|-------|
| Admin auth storage | `localStorage.isAdmin = 'true'` | `localStorage.authToken = <JWT>` |
| API service | `api.*` (public only) | Split into `api.*` (public) and `adminApi.*` (authenticated) |
| Route protection | `useEffect` localStorage check | `<ProtectedRoute>` wrapper in `App.jsx` |
| Admin login page | Basic form | Polished card with show/hide password + proper error display |
| Admin dashboard | `isAdmin` check | JWT verification on mount via `adminApi.verifyToken()` |
| DataContext | `alert()` on errors | Throws errors so callers can handle them |

---

## Project Structure

```
tanveer-production/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection with retry logic
│   ├── middleware/
│   │   ├── auth.js            # JWT Bearer token protection middleware
│   │   └── errorHandler.js    # asyncHandler + global error handler
│   ├── models/
│   │   ├── User.js            # bcrypt password hashing pre-save hook
│   │   ├── Product.js         # Full-text search index
│   │   ├── Blog.js            # Published flag + tags
│   │   └── SiteSettings.js   # Singleton site config
│   ├── routes/
│   │   ├── auth.js            # POST /login, GET /me, PUT /change-password
│   │   ├── products.js        # Full CRUD — writes protected
│   │   ├── blogs.js           # Full CRUD — writes protected
│   │   ├── settings.js        # GET (public), PUT (protected)
│   │   ├── upload.js          # Image upload — protected
│   │   └── seed.js            # DB seed — protected
│   ├── server.js              # Express app wiring
│   ├── package.json           # "type": "module"
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── context/DataContext.jsx   # Global state — API bootstrap
    │   ├── hooks/useAuth.js          # Auth hook (login/logout)
    │   ├── services/api.js           # api.* (public) + adminApi.* (JWT)
    │   ├── pages/
    │   │   ├── AdminLogin.jsx        # JWT login, polished UI
    │   │   ├── AdminDashboard.jsx    # Token-verified, grouped product list
    │   │   └── …all other pages
    │   └── App.jsx                   # <ProtectedRoute> wraps all /admin/* routes
    ├── vite.config.js
    └── package.json
```

---

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI and JWT_SECRET
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### First Run

1. Start the backend and frontend.
2. Visit `/admin` and sign in with username `admin` / password from `ADMIN_PASSWORD` in your `.env` (default: `admin123`).
3. Once logged in, go to **Dashboard → Re-seed DB** to populate products and blogs.
4. **Change the default password immediately** via the Settings page.

---

## API Reference

### Public Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | All products (supports `?search=`, `?category=`, `?brand=`) |
| GET | `/api/products/:id` | Single product |
| GET | `/api/blogs` | All published blogs |
| GET | `/api/blogs/:id` | Single blog post |
| GET | `/api/settings` | Site settings |
| GET | `/health` | Server + DB health check |

### Protected Endpoints (requires `Authorization: Bearer <token>`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login — returns JWT |
| GET | `/api/auth/me` | Verify token + get user info |
| PUT | `/api/auth/change-password` | Update password |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/:id` | Update blog post |
| DELETE | `/api/blogs/:id` | Delete blog post |
| PUT | `/api/settings` | Update site settings |
| POST | `/api/upload` | Upload image |
| POST | `/api/seed` | Re-seed database |
