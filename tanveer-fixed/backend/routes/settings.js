import { Router } from 'express';
import SiteSettings from '../models/SiteSettings.js';
import protect from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * @route  GET /api/settings
 * @access Public
 * @desc   Retrieve site-wide settings (creates defaults on first call)
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  })
);

/**
 * @route  PUT /api/settings
 * @access Private
 * @desc   Update site-wide settings (upsert)
 */
router.put(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(settings);
  })
);

export default router;
