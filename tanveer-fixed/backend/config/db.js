import mongoose from 'mongoose';

const connectDB = async () => {
  // If already connected, reuse the connection (serverless warm instance optimization)
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB: reusing existing connection');
    return;
  }

  // If currently connecting, wait for it
  if (mongoose.connection.readyState === 2) {
    console.log('MongoDB: connection in progress, waiting...');
    await new Promise((resolve) => mongoose.connection.once('connected', resolve));
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  console.log('MongoDB: initiating new connection...');
  console.log('MongoDB: URI type:', uri.startsWith('mongodb+srv') ? 'SRV' : 'Standard');

  try {
    await mongoose.connect(uri, {
      bufferCommands: true,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB: connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB: connection FAILED:', error.message);
    // Do NOT cache the failure — next request should retry
    throw error;
  }
};

export default connectDB;