"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
class AuthService {
    async register(server, username, email, password) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await server.mongo.db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
        });
        return user.ops[0];
    }
    async login(server, email, password) {
        const user = await server.mongo.db.collection('users').findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
        return { token };
    }
    async changePassword(server, userId, oldPassword, newPassword) {
        const user = await server.mongo.db.collection('users').findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid old password');
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await server.mongo.db.collection('users').updateOne({ _id: userId }, { $set: { password: hashedPassword } });
        return { message: 'Password changed successfully' };
    }
    async forgotPassword(server, email) {
        const user = await server.mongo.db.collection('users').findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET, { expiresIn: '1h' });
        // Send token to user's email (implementation depends on your email service)
        return { message: 'Password reset email sent', token };
    }
    async resetPassword(server, token, newPassword) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            const userId = new mongodb_1.ObjectId(decoded.id);
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
            await server.mongo.db.collection('users').updateOne({ _id: userId }, { $set: { password: hashedPassword } });
            return { message: 'Password reset successfully' };
        }
        catch (err) {
            throw new Error('Invalid or expired token');
        }
    }
}
exports.AuthService = AuthService;
