import connectDB from '../config/db.js';

/**
 * Middleware that ensures a DB connection exists before the route handler runs.
 * On Vercel serverless, the module-level connectDB() may still be in progress
 * when the first request arrives. This middleware awaits it inline.
 */
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('ensureDB: failed to connect:', err.message);
    res.status(503).json({
      success: false,
      message: 'Database unavailable — please try again in a moment',
    });
  }
};

export default ensureDB;