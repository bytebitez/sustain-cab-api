"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    async createUser(username, email, password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = { username, email, password: hashedPassword };
        return user;
    }
    async validatePassword(user, password) {
        return bcrypt_1.default.compare(password, user.password);
    }
}
exports.userModel = new UserModel();
