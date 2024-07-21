import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
}

class UserModel {
  async createUser(username: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { username, email, password: hashedPassword };
    return user;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}

export const userModel = new UserModel();
