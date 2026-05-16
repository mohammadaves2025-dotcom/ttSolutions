/**
 * Centralised async error wrapper — eliminates repetitive try/catch in route handlers.
 * Usage: router.get('/', asyncHandler(async (req, res) => { ... }))
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Global Express error handler — must be registered last via app.use().
 */
export const globalErrorHandler = (err, req, res, _next) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Log full stack in development
  if (isDev) console.error(err.stack);
  else console.error(`[${new Date().toISOString()}] ${status} — ${message}`);

  res.status(status).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
};
