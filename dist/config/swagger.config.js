"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDocs = {
    openapi: '3.0.0',
    info: {
        title: 'Gym Management API',
        version: '1.0.0',
        description: 'API for Gym Class Scheduling and Membership Management',
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ BearerAuth: [] }],
};
exports.default = swaggerDocs;
