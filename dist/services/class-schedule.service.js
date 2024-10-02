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
            const { date, time, trainerId } = classDetails;
            const classCount = yield prisma_client_1.prisma.classSchedule.count({ where: { date } });
            if (classCount >= 5)
                throw new Error('Cannot schedule more than 5 classes per day.');
            return prisma_client_1.prisma.classSchedule.create({
                data: { date, time, trainerId, duration: 2 },
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
            return prisma_client_1.prisma.classSchedule.update({
                where: { id: Number(id) },
                data: classDetails,
            });
        });
    }
    static deleteClassSchedule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.prisma.classSchedule.delete({ where: { id: Number(id) } });
        });
    }
}
exports.ClassScheduleService = ClassScheduleService;
