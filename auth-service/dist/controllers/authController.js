"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = loginHandler;
exports.registerHandler = registerHandler;
exports.changePasswordHandler = changePasswordHandler;
exports.forgotPasswordHandler = forgotPasswordHandler;
exports.resetPasswordHandler = resetPasswordHandler;
const authService_1 = require("../services/authService");
const mongodb_1 = require("mongodb");
const authService = new authService_1.AuthService();
async function loginHandler(request, reply) {
    const { email, password } = request.body;
    const result = await authService.login(request.server, email, password);
    return result;
}
async function registerHandler(request, reply) {
    const { username, email, password } = request.body;
    const result = await authService.register(request.server, username, email, password);
    return result;
}
async function changePasswordHandler(request, reply) {
    const { oldPassword, newPassword } = request.body;
    const userId = request.user?.id; // Assuming user ID is available in request context
    if (!userId) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
    }
    const result = await authService.changePassword(request.server, new mongodb_1.ObjectId(userId), oldPassword, newPassword);
    return result;
}
async function forgotPasswordHandler(request, reply) {
    const { email } = request.body;
    const result = await authService.forgotPassword(request.server, email);
    return result;
}
async function resetPasswordHandler(request, reply) {
    const { token, newPassword } = request.body;
    const result = await authService.resetPassword(request.server, token, newPassword);
    return result;
}
