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
exports.getTrainers = exports.deleteTrainer = exports.updateTrainer = exports.createTrainer = void 0;
const trainer_service_1 = require("../services/trainer.service");
const createTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainer = yield trainer_service_1.TrainerService.createTrainer(req.body);
        res.status(201).json({ success: true, trainer });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.createTrainer = createTrainer;
const updateTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainer = yield trainer_service_1.TrainerService.updateTrainer(req.params.id, req.body);
        res.status(200).json({ success: true, trainer });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.updateTrainer = updateTrainer;
const deleteTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield trainer_service_1.TrainerService.deleteTrainer(req.params.id);
        res.status(200).json({ success: true, message: 'Trainer deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.deleteTrainer = deleteTrainer;
const getTrainers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainers = yield trainer_service_1.TrainerService.getTrainers();
        res.status(200).json({ success: true, trainers });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.getTrainers = getTrainers;
