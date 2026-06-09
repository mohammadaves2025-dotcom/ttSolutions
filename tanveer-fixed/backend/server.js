import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { globalErrorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import blogRoutes from './routes/blogs.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import seedRoutes from './routes/seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IS_PROD = process.env.NODE_ENV === 'production';

// ─── Express App ─────────────────────────────────────────────────────────────
const app = express();

// MUST be first — Vercel sits behind a proxy and sets X-Forwarded-For.
app.set('trust proxy', 1);

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI defined:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI prefix:', process.env.MONGODB_URI?.substring(0, 40));

// ─── Connect to Database ──────────────────────────────────────────────────────
connectDB().catch((err) => {
  console.error('Initial DB connection failed:', err.message);
});

// ─── Security ─────────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://www.ttofficesolutions.in',
  'https://ttofficesolutions.in',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      if (origin.endsWith('.vercel.app')) return cb(null, true);
      cb(new Error(`CORS: origin "${origin}" is not allowed`));
    },
    credentials: true,
  })
);

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests — please try again later' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts — please try again later' },
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// ─── Request Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ──────────────────────────────────────────────────────────────────
app.use(morgan('dev'));

// ─── Static Uploads ───────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join('/tmp', 'uploads')));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) =>
  res.json({ status: 'ok', service: 'T&T Office Solutions API', version: '2.0.0' })
);

app.get('/health', async (_req, res) => {
  const { readyState } = mongoose.connection;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: 'ok',
    db: states[readyState] || 'unknown',
    dbState: readyState,
    uriDefined: !!process.env.MONGODB_URI,
    uriPrefix: process.env.MONGODB_URI?.substring(0, 40),
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

if (!IS_PROD) {
  app.use('/api/seed', seedRoutes);
} else {
  app.use('/api/seed', (_req, res) =>
    res.status(403).json({ success: false, message: 'Seed endpoint is disabled in production' })
  );
}

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(globalErrorHandler);

// ─── Local Dev Only ───────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀  Server running locally on http://localhost:${PORT}`);
  });
}

export default app;