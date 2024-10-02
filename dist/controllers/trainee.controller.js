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
exports.cancelBooking = exports.bookClass = exports.updateProfile = void 0;
const trainee_service_1 = require("../services/trainee.service");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee = yield trainee_service_1.TraineeService.updateProfile(req.user.id, req.body);
        res.status(200).json({ success: true, trainee });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.updateProfile = updateProfile;
const bookClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield trainee_service_1.TraineeService.bookClass(req.user.id, req.body.classScheduleId);
        res.status(201).json({ success: true, booking });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.bookClass = bookClass;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield trainee_service_1.TraineeService.cancelBooking(req.user.id, req.params.bookingId);
        res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.cancelBooking = cancelBooking;
