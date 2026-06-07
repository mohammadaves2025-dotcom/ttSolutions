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

    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('MONGODB_URI starts with:', process.env.MONGODB_URI?.substring(0, 50));

    const conn = await mongoose.connect(uri, {
      // These options are recommended for serverless (Vercel) environments
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('========== MONGODB ERROR ==========');
    console.error(error);
    console.error('Name:', error.name);
    console.error('Message:', error.message);
    console.error('Cause:', error.cause);
    console.error('===================================');

    throw error;
  }
};

export default connectDB;
