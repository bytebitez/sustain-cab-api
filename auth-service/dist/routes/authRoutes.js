"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const authController_1 = require("../controllers/authController");
async function default_1(server) {
    server.post('/login', {
        schema: {
            description: 'User login',
            tags: ['auth'],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['email', 'password'],
            },
            response: {
                200: {
                    description: 'Successful login',
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                    },
                },
            },
        },
    }, authController_1.loginHandler);
    server.post('/register', {
        schema: {
            description: 'User registration',
            tags: ['auth'],
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['username', 'email', 'password'],
            },
            response: {
                201: {
                    description: 'User registered successfully',
                    type: 'object',
                    properties: {
                        username: { type: 'string' },
                        email: { type: 'string' },
                    },
                },
            },
        },
    }, authController_1.registerHandler);
    server.post('/forgot-password', {
        schema: {
            description: 'Initiate password reset',
            tags: ['auth'],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                },
                required: ['email'],
            },
            response: {
                200: {
                    description: 'Password reset email sent',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        token: { type: 'string' },
                    },
                },
            },
        },
    }, authController_1.forgotPasswordHandler);
    server.post('/reset-password', {
        schema: {
            description: 'Reset password',
            tags: ['auth'],
            body: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                    newPassword: { type: 'string' },
                },
                required: ['token', 'newPassword'],
            },
            response: {
                200: {
                    description: 'Password reset successfully',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, authController_1.resetPasswordHandler);
    server.post('/change-password', {
        schema: {
            description: 'Change user password',
            tags: ['auth'],
            body: {
                type: 'object',
                properties: {
                    oldPassword: { type: 'string' },
                    newPassword: { type: 'string' },
                },
                required: ['oldPassword', 'newPassword'],
            },
            response: {
                200: {
                    description: 'Password changed successfully',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
        preHandler: async (request, reply) => {
            // Implement authentication check here
        },
    }, authController_1.changePasswordHandler);
}
