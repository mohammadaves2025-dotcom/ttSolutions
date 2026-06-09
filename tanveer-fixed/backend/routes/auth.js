import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import protect from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * @route  POST /api/auth/login
 * @access Public
 * @desc   Authenticate user and return signed JWT
 */
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username?.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Bootstrap default admin if no users exist.
    // Uses new User().save() so the pre('save') bcrypt hook runs and hashes the password.
    const userCount = await User.countDocuments();
    console.log(`[auth/login] userCount=${userCount}`);

    if (userCount === 0) {
      const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
      const defaultPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
      console.log(`[auth/login] Bootstrapping admin user: username="${defaultUsername}", passwordLength=${defaultPassword.length}`);
      try {
        const adminUser = new User({ username: defaultUsername, password: defaultPassword });
        await adminUser.save();
        console.log('[auth/login] ✅ Default admin user created successfully.');
      } catch (bootstrapErr) {
        console.error('[auth/login] ❌ Bootstrap FAILED:', bootstrapErr.message, bootstrapErr);
        // Still attempt login — don't block if bootstrap fails (e.g. duplicate key race)
      }
    }

    const lookupUsername = username.toLowerCase().trim();
    const user = await User.findOne({ username: lookupUsername });
    console.log(`[auth/login] Looking up user "${lookupUsername}": found=${!!user}`);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const passwordMatch = await user.comparePassword(password);
    console.log(`[auth/login] Password match: ${passwordMatch}`);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({ success: true, token, user: { username: user.username } });
  })
);

/**
 * @route  GET /api/auth/me
 * @access Private
 * @desc   Verify token and return current user info
 */
router.get(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: { username: user.username } });
  })
);

/**
 * @route  PUT /api/auth/change-password
 * @access Private
 * @desc   Update admin password
 */
router.put(
  '/change-password',
  protect,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both passwords are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }

    const user = await User.findById(req.user.id);
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  })
);

/**
 * @route  POST /api/auth/reset-admin
 * @access Public (REMOVE AFTER USE — only works when no users exist OR with env var guard)
 * @desc   Emergency: delete all users and re-create admin from env vars.
 *         Only works if ADMIN_RESET_SECRET env var matches the request body secret.
 */
router.post(
  '/reset-admin',
  asyncHandler(async (req, res) => {
    const { secret } = req.body;
    const resetSecret = process.env.ADMIN_RESET_SECRET;

    if (!resetSecret || secret !== resetSecret) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await User.deleteMany({});
    console.log('[reset-admin] Deleted all users.');

    const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const defaultPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
    const adminUser = new User({ username: defaultUsername, password: defaultPassword });
    await adminUser.save();
    console.log(`[reset-admin] ✅ Admin re-created: username="${defaultUsername}"`);

    res.json({ success: true, message: `Admin user "${defaultUsername}" re-created.` });
  })
);

export default router;
