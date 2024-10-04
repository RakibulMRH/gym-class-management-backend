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
exports.TraineeService = void 0;
const prisma_client_1 = require("../config/prisma.client");
class TraineeService {
    static updateProfile(id, profileDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma_client_1.prisma.user.update({
                    where: { id },
                    data: profileDetails,
                });
            }
            catch (error) {
                const err = new Error('Validation error occurred.');
                err.name = 'ValidationError';
                throw err;
            }
        });
    }
    static bookClass(userId, classScheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classCount = yield prisma_client_1.prisma.booking.count({ where: { classScheduleId } });
            if (classCount >= 10) {
                const error = new Error('Class schedule is full. Maximum 10 trainees allowed per schedule.');
                error.name = 'BookingLimitExceeded';
                throw error;
            }
            return prisma_client_1.prisma.booking.create({
                data: {
                    trainee: { connect: { id: userId } },
                    classSchedule: { connect: { id: classScheduleId } },
                },
            });
        });
    }
    static cancelBooking(userId, bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield prisma_client_1.prisma.booking.findUnique({ where: { id: bookingId } });
            if (!booking || booking.traineeId !== userId) {
                const error = new Error('Booking not found or unauthorized.');
                error.name = 'UnauthorizedError';
                throw error;
            }
            return prisma_client_1.prisma.booking.delete({ where: { id: bookingId } });
        });
    }
    static getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.prisma.user.findUnique({
                where: { id },
            });
        });
    }
}
exports.TraineeService = TraineeService;
