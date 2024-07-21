import { FastifyInstance } from 'fastify';
import { loginHandler, registerHandler, changePasswordHandler, forgotPasswordHandler, resetPasswordHandler } from '../controllers/authController';

export default async function (server: FastifyInstance) {
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
  }, loginHandler);

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
  }, registerHandler);

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
  }, forgotPasswordHandler);

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
  }, resetPasswordHandler);

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
    preHandler: async (request: any, reply: any) => {
      // Implement authentication check here
    },
  }, changePasswordHandler);
}
