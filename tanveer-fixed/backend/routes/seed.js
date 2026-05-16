import { Router } from 'express';
import Product from '../models/Product.js';
import Blog from '../models/Blog.js';
import SiteSettings from '../models/SiteSettings.js';
import protect from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// ─── Seed helpers ────────────────────────────────────────────────────────────
const createModel = (id, title, subtitle, specs = {}, description = '', keyFeatures = []) => ({
  id, title, subtitle, description,
  image: '/assets/shredders.png',
  category: 'Document Shredders',
  subcategory: 'Office',
  brand: title.toUpperCase().startsWith('AVANTI') ? 'AVANTI' : 'ANTIVA',
  specs, keyFeatures,
  brochureLink: '#',
  videoLink: '',
  isAvailableOnGeM: subtitle?.includes('GeM') ?? false,
});

const createAppModel = (id, title, subtitle, specs = {}, description = '', keyFeatures = []) => ({
  id, title, subtitle, description,
  image: '/assets/application-shredders.png',
  category: 'Special Application',
  subcategory: 'Industrial',
  brand: 'AVANTI',
  specs, keyFeatures,
  brochureLink: '#',
  videoLink: '',
});

const createLaminatorModel = (id, title, subtitle, specs = {}, description = '', keyFeatures = []) => ({
  id, title, subtitle, description,
  image: '/assets/binders-and-laminators.png',
  category: 'Laminators',
  subcategory: 'Office',
  brand: 'AVANTI',
  specs, keyFeatures,
  brochureLink: '#',
  videoLink: '',
});

const PRODUCTS = [
  // ── ANTIVA – Desk Side ──
  {
    id: 'antiva-ps-225', title: 'ANTIVA PS 225', subtitle: 'DESK SIDE DOCUMENT SHREDDER',
    description: 'For high security shredding and continuous operation.',
    image: '/assets/shredders.png', category: 'Document Shredders', subcategory: 'Desk Side', brand: 'ANTIVA',
    keyFeatures: ['Auto Start & Stop', 'High-grade alloy steel cutters', 'Low noise design', 'All-metal construction', 'Overload protection with buzzer', '30-minute continuous operation', 'Full spare parts supply'],
    specs: { 'Feed width (mm)': '225 mm', 'Shred size': 'Strip Cut', 'Shred Capacity (70 gsm A4)': '8 sheets', 'Voltage': '220V', 'Power': '190W', 'Speed': '2 m/min', 'Waste Volume': '18L', 'Weight': '17 Kg', 'Dimensions (HxWxD)': '575x335x420 mm', 'Motor Start/Off': 'Paper Sensor', 'Working cycle': 'Continuous' },
    brochureLink: '#', videoLink: '', isAvailableOnGeM: false,
  },
  createModel('antiva-ps-225-e', 'ANTIVA PS 225 E', 'DESK SIDE DOCUMENT SHREDDER — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '12 sheets', 'Shred size': 'Strip Cut' }),
  // ── ANTIVA – Departmental Office ──
  createModel('antiva-ps-240', 'ANTIVA PS 240', 'Departmental Office Shredder', { 'Shred Capacity (70 gsm A4)': '28–32 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-240-hd', 'ANTIVA PS 240 HD', 'Departmental Office Shredder — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '42–46 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-240-cc', 'ANTIVA PS 240 CC', 'Departmental Office Shredder — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '26–28 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-240-ccx', 'ANTIVA PS 240 CCX', 'Departmental Office Shredder — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '16–18 sheets', 'Shred size': 'Micro Cut' }),
  // ── ANTIVA – Departmental ──
  createModel('antiva-ps-300', 'ANTIVA PS 300', 'Departmental Shredder', { 'Shred Capacity (70 gsm A4)': '15 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-300-cc', 'ANTIVA PS 300 CC', 'Departmental Shredder — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '18–20 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-300-hd', 'ANTIVA PS 300 HD', 'Departmental Shredder — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '27–30 sheets', 'Shred size': 'Strip Cut' }),
  // ── ANTIVA – Heavy Duty ──
  createModel('antiva-ps-400', 'ANTIVA PS 400', 'Heavy Duty Shredder — PRODUCT AVAILABLE ON GeM', { 'Shred Capacity (70 gsm A4)': '30 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-403', 'ANTIVA PS 403', 'Heavy Duty Shredder', { 'Shred Capacity (70 gsm A4)': '40 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-306', 'ANTIVA PS 306', 'Heavy Duty Shredder', { 'Shred Capacity (70 gsm A4)': '50 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-404', 'ANTIVA PS 404', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '55 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-404-cc', 'ANTIVA PS 404 CC', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '70 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-407', 'ANTIVA PS 407', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '75 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-407-cc', 'ANTIVA PS 407 CC', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '100 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-407-ccx', 'ANTIVA PS 407 CCX', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '60 sheets', 'Shred size': 'Micro Cut' }),
  createModel('antiva-ps-409', 'ANTIVA PS 409', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '95 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-409-cc', 'ANTIVA PS 409 CC', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-409-ccx', 'ANTIVA PS 409 CCX', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '80 sheets', 'Shred size': 'Micro Cut' }),
  // ── ANTIVA – High Speed ──
  createModel('antiva-ps-4071', 'ANTIVA PS 4071', 'High Speed & Motor Power', { 'Shred Capacity (70 gsm A4)': '70 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-4071-cc', 'ANTIVA PS 4071 CC', 'High Speed & Motor Power', { 'Shred Capacity (70 gsm A4)': '95 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-4091', 'ANTIVA PS 4091', 'High Capacity / High Speed', { 'Shred Capacity (70 gsm A4)': '95 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-4091-cc', 'ANTIVA PS 4091 CC', 'High Capacity / High Speed', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  // ── ANTIVA – Industrial ──
  createModel('antiva-ps-409-hd', 'ANTIVA PS 409 HD', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '100 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-409-hdcc', 'ANTIVA PS 409 HDCC', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  createModel('antiva-ps-500', 'ANTIVA PS 500', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '96 sheets', 'Shred size': 'Strip Cut' }),
  createModel('antiva-ps-500-cc', 'ANTIVA PS 500 CC', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  // ── AVANTI – Document Shredders (mirrors ANTIVA set) ──
  createModel('avanti-ps-225', 'AVANTI PS 225', 'DESK SIDE DOCUMENT SHREDDER', { 'Shred Capacity (70 gsm A4)': '8 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-225-e', 'AVANTI PS 225 E', 'DESK SIDE DOCUMENT SHREDDER', { 'Shred Capacity (70 gsm A4)': '12 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-240', 'AVANTI PS 240', 'Departmental Office Shredder', { 'Shred Capacity (70 gsm A4)': '28–32 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-240-hd', 'AVANTI PS 240 HD', 'Departmental Office Shredder', { 'Shred Capacity (70 gsm A4)': '42–46 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-240-cc', 'AVANTI PS 240 CC', 'Departmental Office Shredder', { 'Shred Capacity (70 gsm A4)': '26–28 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-240-ccx', 'AVANTI PS 240 CCX', 'Departmental Office Shredder', { 'Shred Capacity (70 gsm A4)': '16–18 sheets', 'Shred size': 'Micro Cut' }),
  createModel('avanti-ps-300', 'AVANTI PS 300', 'Departmental Shredder', { 'Shred Capacity (70 gsm A4)': '15 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-300-cc', 'AVANTI PS 300 CC', 'Departmental Shredder', { 'Shred Capacity (70 gsm A4)': '18–20 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-300-hd', 'AVANTI PS 300 HD', 'Departmental Shredder', { 'Shred Capacity (70 gsm A4)': '27–30 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-400', 'AVANTI PS 400', 'Heavy Duty Shredder', { 'Shred Capacity (70 gsm A4)': '30 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-403', 'AVANTI PS 403', 'Heavy Duty Shredder', { 'Shred Capacity (70 gsm A4)': '40 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-306', 'AVANTI PS 306', 'Heavy Duty Shredder', { 'Shred Capacity (70 gsm A4)': '50 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-404', 'AVANTI PS 404', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '55 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-404-cc', 'AVANTI PS 404 CC', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '70 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-407', 'AVANTI PS 407', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '75 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-407-cc', 'AVANTI PS 407 CC', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '100 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-407-ccx', 'AVANTI PS 407 CCX', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '60 sheets', 'Shred size': 'Micro Cut' }),
  createModel('avanti-ps-409', 'AVANTI PS 409', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '95 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-409-cc', 'AVANTI PS 409 CC', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-409-ccx', 'AVANTI PS 409 CCX', 'Departmental Heavy Duty', { 'Shred Capacity (70 gsm A4)': '80 sheets', 'Shred size': 'Micro Cut' }),
  createModel('avanti-ps-4071', 'AVANTI PS 4071', 'High Speed & Motor Power', { 'Shred Capacity (70 gsm A4)': '70 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-4071-cc', 'AVANTI PS 4071 CC', 'High Speed & Motor Power', { 'Shred Capacity (70 gsm A4)': '95 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-4091', 'AVANTI PS 4091', 'High Capacity / High Speed', { 'Shred Capacity (70 gsm A4)': '95 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-4091-cc', 'AVANTI PS 4091 CC', 'High Capacity / High Speed', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-409-hd', 'AVANTI PS 409 HD', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '100 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-409-hdcc', 'AVANTI PS 409 HDCC', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  createModel('avanti-ps-500', 'AVANTI PS 500', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '96 sheets', 'Shred size': 'Strip Cut' }),
  createModel('avanti-ps-500-cc', 'AVANTI PS 500 CC', 'Industrial Shredder', { 'Shred Capacity (70 gsm A4)': '125 sheets', 'Shred size': 'Cross Cut' }),
  // ── AVANTI – Application Shredders ──
  createAppModel('avanti-bs-300', 'AVANTI BS 300', 'Volumetric Material & Bottle Shredder cum Disintegrator'),
  createAppModel('avanti-bs-300x', 'AVANTI BS 300X', 'Plastic Film Shredder'),
  createAppModel('avanti-pws-300', 'AVANTI PWS 300', 'Plastic Bottle Shredder'),
  createAppModel('avanti-bs-400', 'AVANTI BS 400', 'Plastic Bottle Shredder'),
  createAppModel('avanti-bs-5620', 'AVANTI BS 5620', 'Industrial Multipurpose Twin Motor Shredder'),
  createAppModel('avanti-msw401', 'AVANTI MSW401', 'Polythene Bag & Synthetic Cloth Shredder'),
  createAppModel('avanti-ms-400', 'AVANTI MS 400', 'Woven Bag Shredder'),
  createAppModel('avanti-es-5012', 'AVANTI ES 5012', 'Multi Application Shredder with Hopper'),
  createAppModel('avanti-ps-409-hu', 'AVANTI PS 409 HU', 'Multi Application Shredder with Hopper'),
  createAppModel('avanti-fs-300', 'AVANTI FS 300', 'Food Waste Shredder'),
  createAppModel('avanti-bc-300', 'AVANTI BC 300', 'Glass Waste Shredder'),
  createAppModel('avanti-bc-400', 'AVANTI BC 400', 'Glass Waste Shredder'),
  createAppModel('avanti-ms-4050', 'AVANTI MS 4050', 'Garden Waste Shredder'),
  createAppModel('avanti-ec-300-hdd-combo', 'AVANTI EC 300 HDD COMBO', 'E-Waste Shredder'),
  createAppModel('avanti-es-400-hd-combo', 'AVANTI ES 400 HD COMBO', 'E-Waste Shredder'),
  createAppModel('avanti-ews-4050', 'AVANTI EWS 4050', 'E-Waste Shredder'),
  createAppModel('avanti-ews-5010', 'AVANTI EWS 5010', 'E-Waste Shredder'),
  createAppModel('avanti-ews-5515', 'AVANTI EWS 5515', 'E-Waste Shredder'),
  createAppModel('avanti-ews-5620', 'AVANTI EWS 5620', 'E-Waste Shredder'),
  createAppModel('avanti-ps-404-l', 'AVANTI PS 404 L', 'Laminate Shredder'),
  createAppModel('avanti-ps-750', 'AVANTI PS 750', 'Large Format & Carton Box Shredder'),
  createAppModel('avanti-cp-450', 'AVANTI CP 450', 'Cardboard Perforator & Shredder'),
  createAppModel('avanti-cp-450-v', 'AVANTI CP 450 V', 'Cardboard Perforator & Shredder'),
  createAppModel('avanti-cp-455', 'AVANTI CP 455', 'Cardboard Perforator & Shredder'),
  createAppModel('avanti-cp-455-v', 'AVANTI CP 455 V', 'Cardboard Perforator & Shredder'),
  createAppModel('avanti-mr-300', 'AVANTI MR 300', 'Shredder with Segregator'),
  createAppModel('avanti-mr-302-ss', 'AVANTI MR 302 SS', 'Shredder with Segregator'),
  createAppModel('avanti-ms-202', 'AVANTI MS 202', 'Compost Shredder'),
  createAppModel('avanti-bs-100p', 'AVANTI BS 100P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-200-p', 'AVANTI BS 200 P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-202-p', 'AVANTI BS 202 P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-203-p', 'AVANTI BS 203 P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-200-pv', 'AVANTI BS 200 PV', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-202-pv', 'AVANTI BS 202 PV', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-203-pv', 'AVANTI BS 203 PV', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-300-p', 'AVANTI BS 300 P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-400-p', 'AVANTI BS 400 P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-bs-4050-p', 'AVANTI BS 4050 P', 'Pet Bottle Crusher Shredder'),
  createAppModel('avanti-hs-404', 'AVANTI HS 404', 'Hopper Shredder — 55 sheets / Strip Cut', { Capacity: '55 sheets', Type: 'Strip Cut', Feature: 'Hopper' }),
  createAppModel('avanti-hs-404-cc', 'AVANTI HS 404 CC', 'Hopper Shredder — 65–70 sheets / Cross Cut', { Capacity: '65–70 sheets', Type: 'Cross Cut', Feature: 'Hopper' }),
  createAppModel('avanti-hs-404-ccx', 'AVANTI HS 404 CCX', 'Hopper Shredder — 28–32 sheets / Micro Cut', { Capacity: '28–32 sheets', Type: 'Micro Cut', Feature: 'Hopper' }),
  createAppModel('avanti-hs-407', 'AVANTI HS 407', 'Hopper Shredder — 65–70 sheets / Strip Cut', { Capacity: '65–70 sheets', Type: 'Strip Cut', Feature: 'Hopper' }),
  createAppModel('avanti-hs-407-cc', 'AVANTI HS 407 CC', 'Hopper Shredder — 90–95 sheets / Cross Cut', { Capacity: '90–95 sheets', Type: 'Cross Cut', Feature: 'Hopper' }),
  createAppModel('avanti-hs-409', 'AVANTI HS 409', 'Hopper Shredder — 90–95 sheets / Strip Cut', { Capacity: '90–95 sheets', Type: 'Strip Cut', Feature: 'Hopper' }),
  createAppModel('avanti-hs-409-cc', 'AVANTI HS 409 CC', 'Hopper Shredder — 120–125 sheets / Cross Cut', { Capacity: '120–125 sheets', Type: 'Cross Cut', Feature: 'Hopper' }),
  createAppModel('avanti-es-5012-automated', 'AVANTI ES 5012 Automated', 'Automated Shredding Solutions'),
  createAppModel('avanti-ps-1000-cc', 'AVANTI PS 1000 CC', 'Cellulose / Pulp Shredder'),
  createAppModel('avanti-uv-36', 'AVANTI UV 36', 'UV-C Sterilizer'),
  // ── AVANTI – Laminators & Binders ──
  createLaminatorModel('avanti-clp-21', 'AVANTI CLP 21', 'Comb Binder'),
  createLaminatorModel('avanti-clp-21-s', 'AVANTI CLP 21 S', 'Comb Binder'),
  createLaminatorModel('avanti-sb-340', 'AVANTI SB 340', 'Spiral Binder'),
  createLaminatorModel('avanti-dl-685', 'AVANTI DL 685', 'Roll Laminator'),
  createLaminatorModel('avanti-dl-1000', 'AVANTI DL 1000', 'Roll Laminator'),
  createLaminatorModel('avanti-dl-300', 'AVANTI DL 300', 'Pouch Laminator'),
];

const BLOGS = [
  {
    id: '1', title: 'Why Shredding is Important for Data Security',
    content: '<p>In today\'s digital age, physical document security is often overlooked. However, dumpster diving remains a common tactic for identity thieves. A cross-cut or micro-cut shredder is your first line of defence against data breaches that originate from discarded paperwork.</p><p>Government agencies require DIN 66399 compliant shredding. Corporate offices dealing with confidential employee records, financial statements, and client data should invest in at minimum a P-4 security-level shredder.</p>',
    author: 'Admin', date: '2023-10-25', published: true,
    image: 'https://placehold.co/800x400/0A7A45/ffffff?text=Data+Security',
    excerpt: 'Physical document security is often overlooked in the digital age — here\'s why it shouldn\'t be.',
    tags: ['data security', 'shredding', 'compliance'],
  },
  {
    id: '2', title: 'Choosing the Right Shredder for Your Office',
    content: '<p>Strip-cut, cross-cut, or micro-cut? The security level you need depends on the sensitivity of the documents you handle. Strip-cut offers the least security, while micro-cut (P-5 and above) meets government-grade requirements.</p><p>Volume matters too — a desk-side shredder handles 8–12 sheets and suits individual use, while departmental units handle 30–100+ sheets for shared team environments.</p>',
    author: 'Admin', date: '2023-11-12', published: true,
    image: 'https://placehold.co/800x400/065A32/ffffff?text=Choosing+a+Shredder',
    excerpt: 'Strip-cut, cross-cut, or micro-cut? A guide to selecting the right shredder for your needs.',
    tags: ['buying guide', 'shredders', 'office equipment'],
  },
];

/**
 * @route  POST /api/seed
 * @access Private
 * @desc   Wipe and re-seed the database with factory data
 */
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    await Promise.all([
      Product.deleteMany({}),
      Blog.deleteMany({}),
    ]);

    await Product.insertMany(PRODUCTS);
    await Blog.insertMany(BLOGS);

    // Create default settings if absent
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) await SiteSettings.create({});

    res.json({
      success: true,
      message: 'Database seeded successfully',
      counts: { products: PRODUCTS.length, blogs: BLOGS.length },
    });
  })
);

export default router;
