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
exports.getProfile = exports.cancelBooking = exports.bookClass = exports.updateProfile = void 0;
const trainee_service_1 = require("../services/trainee.service");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee = yield trainee_service_1.TraineeService.updateProfile(req.user.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Profile updated successfully',
            data: trainee
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validation error occurred.',
            errorDetails: {
                field: 'profile',
                message: error.message
            }
        });
    }
});
exports.updateProfile = updateProfile;
const bookClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('User ID:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.id); // Log the user ID
        const booking = yield trainee_service_1.TraineeService.bookClass(req.user.id, req.body.classScheduleId);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Class booked successfully',
            data: booking
        });
    }
    catch (error) {
        if (error.name === 'BookingLimitExceeded') {
            res.status(400).json({
                success: false,
                message: 'Class schedule is full. Maximum 10 trainees allowed per schedule.'
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Validation error occurred.',
                errorDetails: {
                    field: 'classScheduleId',
                    message: error.message
                }
            });
        }
    }
});
exports.bookClass = bookClass;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('User ID:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.id); // Log the user ID
        yield trainee_service_1.TraineeService.cancelBooking(req.user.id, Number(req.params.bookingId));
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Booking cancelled successfully'
        });
    }
    catch (error) {
        if (error.name === 'UnauthorizedError') {
            res.status(401).json({
                success: false,
                message: 'Unauthorized access.',
                errorDetails: 'You must be an admin to perform this action.'
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Validation error occurred.',
                errorDetails: {
                    field: 'bookingId',
                    message: error.message
                }
            });
        }
    }
});
exports.cancelBooking = cancelBooking;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenUserId = req.user.id;
        const { id } = req.params;
        // Check if the id from the request matches the id from the token
        if (Number(id) !== Number(tokenUserId)) {
            res.status(403).json({
                success: false,
                message: 'Forbidden. You are not allowed to access this profile.',
            });
            return;
        }
        const trainee = yield trainee_service_1.TraineeService.getProfile(tokenUserId);
        if (!trainee) {
            res.status(404).json({
                success: false,
                message: 'Profile not found.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Profile retrieved successfully',
            data: trainee
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'An error occurred while retrieving the profile.',
            errorDetails: {
                field: 'profile',
                message: error.message
            }
        });
    }
});
exports.getProfile = getProfile;
