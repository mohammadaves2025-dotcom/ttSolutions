import { v2 as cloudinary } from 'cloudinary';

// Requires three env vars on the backend deployment (Vercel project settings):
//   CLOUDINARY_CLOUD_NAME
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET
// Get these from the Cloudinary dashboard — the same account already used
// for Orbis Journal can be reused here (just add a distinct folder, see
// upload.js, so the two projects' images stay separated).
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;