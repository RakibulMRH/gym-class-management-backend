"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const class_validator_1 = require("class-validator");
const login_dto_1 = require("../models/dto/login.dto");
const register_dto_1 = require("../models/dto/register.dto");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = new register_dto_1.RegisterDTO();
    Object.assign(dto, req.body);
    const errors = yield (0, class_validator_1.validate)(dto);
    if (errors.length) {
        res.status(400).json({
            success: false,
            message: 'Validation error occurred.',
            errorDetails: errors.map(error => ({
                field: error.property,
                message: Object.values(error.constraints || {}).join(', ')
            }))
        });
        return;
    }
    try {
        const user = yield auth_service_1.AuthService.register(req.body);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            errorDetails: error.message
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = new login_dto_1.LoginDTO();
    Object.assign(dto, req.body);
    const errors = yield (0, class_validator_1.validate)(dto);
    if (errors.length) {
        res.status(400).json({
            success: false,
            message: 'Validation error occurred.',
            errorDetails: errors.map(error => ({
                field: error.property,
                message: Object.values(error.constraints || {}).join(', ')
            }))
        });
        return;
    }
    try {
        const { token } = yield auth_service_1.AuthService.login(req.body.email, req.body.password);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            data: { token }
        });
    }
    catch (error) {
        if (error.name === 'UnauthorizedError') {
            res.status(401).json({
                success: false,
                message: 'Unauthorized access.',
                errorDetails: error.message
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: error.message,
                errorDetails: error.message
            });
        }
    }
});
exports.login = login;
