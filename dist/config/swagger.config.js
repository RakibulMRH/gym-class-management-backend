"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Gym Class Scheduling and Membership Management System API',
            version: '1.0.0',
            description: 'API documentation for the Gym Class Scheduling and Membership Management System',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
