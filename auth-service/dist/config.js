"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
exports.connectToDatabase = connectToDatabase;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-service';
async function connectToDatabase(server) {
    const client = new mongodb_1.MongoClient(exports.MONGODB_URI, {});
    try {
        await client.connect();
        server.mongo = { db: client.db() }; // Attach MongoDB client to server instance
        server.log.info('Connected to MongoDB');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
