"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const class_schedule_route_1 = __importDefault(require("./routes/class-schedule.route"));
const trainee_route_1 = __importDefault(require("./routes/trainee.route"));
const trainer_route_1 = __importDefault(require("./routes/trainer.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.ORIGIN }));
app.use((0, body_parser_1.json)());
// Routes
app.use('/auth', auth_route_1.default);
app.use('/class-schedule', class_schedule_route_1.default);
app.use('/trainee', trainee_route_1.default);
app.use('/trainer', trainer_route_1.default);
// Swagger setup
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup());
exports.default = app;
