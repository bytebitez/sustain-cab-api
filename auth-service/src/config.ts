import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-service';

export async function connectToDatabase(server: any) {
  const client = new MongoClient(MONGODB_URI, { });
  try {
    await client.connect();
    server.mongo = { db: client.db() }; // Attach MongoDB client to server instance
    server.log.info('Connected to MongoDB');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
