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
exports.TrainerService = void 0;
const prisma_client_1 = require("../config/prisma.client");
class TrainerService {
    // Create a new trainer
    static createTrainer(trainerDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma_client_1.prisma.user.create({
                    data: Object.assign(Object.assign({}, trainerDetails), { role: 'TRAINER' }),
                });
            }
            catch (error) {
                const err = new Error('Validation error occurred.');
                err.name = 'ValidationError';
                throw err;
            }
        });
    }
    // Update a trainer's details
    static updateTrainer(id, trainerDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma_client_1.prisma.user.update({
                    where: { id: Number(id) },
                    data: trainerDetails,
                });
            }
            catch (error) {
                const err = new Error('Validation error occurred.');
                err.name = 'ValidationError';
                throw err;
            }
        });
    }
    // Delete a trainer by ID
    static deleteTrainer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma_client_1.prisma.user.delete({
                    where: { id: Number(id) },
                });
            }
            catch (error) {
                const err = new Error('Validation error occurred.');
                err.name = 'ValidationError';
                throw err;
            }
        });
    }
    // Fetch all trainers
    static getTrainers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma_client_1.prisma.user.findMany({
                    where: { role: 'TRAINER' }, // Only fetch users with the role 'TRAINER'
                });
            }
            catch (error) {
                const err = new Error('Validation error occurred.');
                err.name = 'ValidationError';
                throw err;
            }
        });
    }
}
exports.TrainerService = TrainerService;
