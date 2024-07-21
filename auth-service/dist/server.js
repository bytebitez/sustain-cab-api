"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const config_1 = require("./config");
const server = (0, fastify_1.default)({ logger: true });
// Swagger setup
server.register(swagger_1.default, {
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
server.register(swagger_ui_1.default, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
    },
});
// Connect to MongoDB
(0, config_1.connectToDatabase)(server);
// Register routes
server.register(authRoutes_1.default);
exports.default = server;
