import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';
import { User } from '../models/userModel';

export class AuthService {
  async register(server: FastifyInstance, username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await server.mongo.db.collection<User>('users').insertOne({
      username,
      email,
      password: hashedPassword,
    });
    return user.ops[0];
  }

  async login(server: FastifyInstance, email: string, password: string) {
    const user = await server.mongo.db.collection<User>('users').findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token };
  }

  async changePassword(server: FastifyInstance, userId: ObjectId, oldPassword: string, newPassword: string) {
    const user = await server.mongo.db.collection<User>('users').findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await server.mongo.db.collection<User>('users').updateOne({ _id: userId }, { $set: { password: hashedPassword } });

    return { message: 'Password changed successfully' };
  }

  async forgotPassword(server: FastifyInstance, email: string) {
    const user = await server.mongo.db.collection<User>('users').findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // Send token to user's email (implementation depends on your email service)

    return { message: 'Password reset email sent', token };
  }

  async resetPassword(server: FastifyInstance, token: string, newPassword: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const userId = new ObjectId(decoded.id);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await server.mongo.db.collection<User>('users').updateOne({ _id: userId }, { $set: { password: hashedPassword } });

      return { message: 'Password reset successfully' };
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}
