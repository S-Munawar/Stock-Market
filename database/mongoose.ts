import mongoose from 'mongoose'; // ORM - Object Relational Mapping used for connecting to MongoDB
import dotenv from "dotenv";
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable (set MONGODB_URI in .env or .env.local)');

    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false});
    }

    try {
      cached.conn = await cached.promise;
      console.log(`Connected to MongoDB ${process.env.NODE_ENV} - ${MONGODB_URI}`);
    } catch (error) {
      cached.promise = null;
      throw error;
    }

    return cached.conn;
}