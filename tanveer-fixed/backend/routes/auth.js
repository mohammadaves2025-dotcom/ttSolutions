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

    // FIX: Bootstrap default admin only if no users exist — wrapped in a lock-safe upsert pattern
    // to prevent race conditions on concurrent first-boot requests
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
      const defaultPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
      await User.findOneAndUpdate(
        { username: defaultUsername },
        { $setOnInsert: { username: defaultUsername, password: defaultPassword } },
        { upsert: true, new: true }
      );
      console.log('🔐  Default admin user created — change the password immediately.');
    }

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user || !(await user.comparePassword(password))) {
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

export default router;
