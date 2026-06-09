import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB: reusing existing connection');
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    console.log('MongoDB: attempting connection...');

    const conn = await mongoose.connect(uri, {
      // bufferCommands: true (default) — allows Mongoose to queue operations
      // while the connection is being established. Setting it to false was
      // causing "Cannot call X before initial connection" errors on Vercel
      // because the serverless function sometimes routes a request before
      // the async connectDB() promise resolves.
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('========== MONGODB CONNECTION ERROR ==========');
    console.error('Message:', error.message);
    console.error('==============================================');
    // Re-throw so the caller (server.js) can log it.
    // isConnected stays false so the next request retries.
    throw error;
  }
};

export default connectDB;