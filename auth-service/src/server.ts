import Fastify from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';
import authRoutes from './routes/authRoutes';
import { connectToDatabase } from './config';

const server = Fastify({ logger: true });

// Swagger setup
server.register(FastifySwagger, {
  openapi: {
    info: {
      title: 'Auth Service API',
      description: 'API documentation for Auth Service',
      version: '1.0.0',
    },
  },
});

server.register(FastifySwaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
});

// Connect to MongoDB
connectToDatabase(server);

// Register routes
server.register(authRoutes);

export default server;
