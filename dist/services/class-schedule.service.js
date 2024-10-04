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
exports.ClassScheduleService = void 0;
const prisma_client_1 = require("../config/prisma.client");
class ClassScheduleService {
    static createClassSchedule(classDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, time, duration, trainerId } = classDetails;
            // Ensure date is in ISO-8601 format
            const isoDate = new Date(date).toISOString();
            // Validate class duration
            if (duration !== 2) {
                const error = new Error('Class duration must be exactly 2 hours.');
                error.name = 'InvalidDuration';
                throw error;
            }
            // Validate max 5 schedules per day
            const classCount = yield prisma_client_1.prisma.classSchedule.count({
                where: {
                    date: isoDate,
                },
            });
            if (classCount >= 5) {
                const error = new Error('Class schedule is full. Maximum 5 schedules allowed per day.');
                error.name = 'ScheduleLimitExceeded';
                throw error;
            }
            // Check for clashing schedules
            const startTime = new Date(`${isoDate}T${time}`);
            const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000); // duration in hours
            const clashingSchedules = yield prisma_client_1.prisma.classSchedule.findMany({
                where: {
                    date: isoDate,
                    OR: [
                        {
                            time: {
                                lte: endTime.toISOString(),
                            },
                        },
                        {
                            time: {
                                gte: startTime.toISOString(),
                            },
                        },
                    ],
                },
            });
            if (clashingSchedules.length > 0) {
                const error = new Error('Class schedule clashes with an existing schedule.');
                error.name = 'ScheduleClash';
                throw error;
            }
            // Create class schedule
            const data = {
                date: isoDate,
                time,
                duration,
            };
            if (trainerId !== undefined) {
                data.trainer = { connect: { id: trainerId } };
            }
            return prisma_client_1.prisma.classSchedule.create({
                data,
            });
        });
    }
    static getAllClassSchedules() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.prisma.classSchedule.findMany({ include: { trainer: true } });
        });
    }
    static updateClassSchedule(id, classDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { trainerId, date, time, duration } = classDetails;
            // Validate trainerId if provided
            if (trainerId !== undefined) {
                const trainer = yield prisma_client_1.prisma.user.findUnique({
                    where: { id: trainerId },
                });
                if (!trainer || trainer.role !== 'TRAINER') {
                    const error = new Error('Invalid trainerId. Trainer does not exist or is not a trainer.');
                    error.name = 'InvalidTrainerId';
                    throw error;
                }
            }
            // Ensure date is in ISO-8601 format
            const isoDate = new Date(date).toISOString();
            return prisma_client_1.prisma.classSchedule.update({
                where: { id: Number(id) }, // Convert id to integer
                data: {
                    date: isoDate,
                    time,
                    trainerId,
                    duration,
                },
            });
        });
    }
    static deleteClassSchedule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.prisma.classSchedule.delete({ where: { id: Number(id) } }); // Convert id to integer
        });
    }
}
exports.ClassScheduleService = ClassScheduleService;
