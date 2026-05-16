import { Router } from 'express';
import Product from '../models/Product.js';
import protect from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * @route  GET /api/products
 * @access Public
 * @desc   Retrieve all products as { id: product } map (matches frontend expectation)
 *         Supports ?search=query for text search
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { search, category, brand } = req.query;

    const filter = {};
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (brand) filter.brand = brand.toUpperCase();
    if (search) filter.$text = { $search: search };

    const products = await Product.find(filter).lean();

    // Return as id-keyed map to match existing frontend data shape
    const productsMap = products.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {});

    res.json(productsMap);
  })
);

/**
 * @route  GET /api/products/:id
 * @access Public
 * @desc   Get a single product by its custom string ID
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ id: req.params.id }).lean();
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json(product);
  })
);

/**
 * @route  POST /api/products
 * @access Private
 * @desc   Create a new product
 */
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

/**
 * @route  PUT /api/products/:id
 * @access Private
 * @desc   Update a product by its custom string ID
 */
router.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json(product);
  })
);

/**
 * @route  DELETE /api/products/:id
 * @access Private
 * @desc   Delete a product by its custom string ID
 */
router.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted successfully' });
  })
);

export default router;
