"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const class_schedule_route_1 = __importDefault(require("./routes/class-schedule.route"));
const trainee_route_1 = __importDefault(require("./routes/trainee.route"));
const trainer_route_1 = __importDefault(require("./routes/trainer.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN, // Allow requests from Angular frontend
    credentials: true, // Allow credentials like cookies, headers
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization' // Allowed headers
}));
app.use((0, body_parser_1.json)());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/class-schedule', class_schedule_route_1.default);
app.use('/api/trainee', trainee_route_1.default);
app.use('/api/trainer', trainer_route_1.default);
// Swagger setup
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
exports.default = app;
