import { Router } from 'express';
import multer from 'multer';
import protect from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import cloudinary from '../config/cloudinary.js';

// FIX: the old version wrote files to /tmp/uploads. On Vercel, /tmp is not
// persistent storage — it can be wiped between invocations and is always
// wiped on redeploy, so previously "uploaded" images could silently
// disappear. Switched to multer's in-memory storage + a direct streaming
// upload to Cloudinary, which is durable and already used elsewhere
// (Orbis Journal uses the same pattern).
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'), false);
    }
  },
});

const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'ttsolutions', resource_type: 'image' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

const router = Router();

/**
 * @route  POST /api/upload
 * @access Private
 * @desc   Upload a single image file to Cloudinary — returns the public URL
 */
router.post(
  '/',
  protect,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Image storage is not configured — missing Cloudinary environment variables on the server',
      });
    }

    const result = await streamUpload(req.file.buffer);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  })
);

export default router;