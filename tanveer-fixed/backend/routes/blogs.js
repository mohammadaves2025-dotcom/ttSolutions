import { Router } from 'express';
import Blog from '../models/Blog.js';
import protect from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * @route  GET /api/blogs
 * @access Public
 * @desc   Retrieve all published blog posts (sorted newest first)
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
    res.json(blogs);
  })
);

/**
 * @route  GET /api/blogs/:id
 * @access Public
 * @desc   Get a single blog post by its custom string ID
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ id: req.params.id }).lean();
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.json(blog);
  })
);

/**
 * @route  POST /api/blogs
 * @access Private
 * @desc   Create a new blog post
 */
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  })
);

/**
 * @route  PUT /api/blogs/:id
 * @access Private
 * @desc   Update a blog post by its custom string ID
 */
router.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const blog = await Blog.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.json(blog);
  })
);

/**
 * @route  DELETE /api/blogs/:id
 * @access Private
 * @desc   Delete a blog post by its custom string ID
 */
router.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const blog = await Blog.findOneAndDelete({ id: req.params.id });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.json({ success: true, message: 'Blog post deleted successfully' });
  })
);

export default router;
