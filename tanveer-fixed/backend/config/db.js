import dns from 'dns';
import mongoose from 'mongoose';

dns.setDefaultResultOrder('ipv4first');

const RETRY_INTERVAL_MS = 5000;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌  MONGO_URI is not set. Please configure your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅  MongoDB connected');
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`);
    console.log(`🔄  Retrying in ${RETRY_INTERVAL_MS / 1000}s...`);
    setTimeout(connectDB, RETRY_INTERVAL_MS);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️   Mongoose disconnected — scheduling reconnect...');
  setTimeout(connectDB, RETRY_INTERVAL_MS);
});

mongoose.connection.on('error', (err) => {
  console.error('❌  Mongoose error:', err.message);
});

export default connectDB;
