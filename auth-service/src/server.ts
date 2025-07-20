import Fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';
import authRoutes from './routes/authRoutes';
import { connectToDatabase } from './config';

const server: FastifyInstance = Fastify({ logger: true });

// Swagger setup
server.register(FastifySwagger, {
  swagger: {
    info: {
      title: 'Test Swagger',
      description: 'Testing the Fastify Swagger API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'auth', description: 'Authentication related end-points' },
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
});

// Register Swagger UI
server.register(FastifySwaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
});

wjfdkdbkjdbsksjbdkjss

// Connect to MongoDB
connectToDatabase(server);

// Register routes
server.register(authRoutes);
wjnkjfkfbc

export default server;
