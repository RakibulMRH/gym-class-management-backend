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
exports.deleteClassSchedule = exports.updateClassSchedule = exports.getAllClassSchedules = exports.createClassSchedule = void 0;
const class_schedule_service_1 = require("../services/class-schedule.service");
const class_validator_1 = require("class-validator");
const create_class_schedule_dto_1 = require("../models/dto/create-class-schedule.dto");
// Create class schedule
const createClassSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = new create_class_schedule_dto_1.CreateClassScheduleDTO();
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
        const classSchedule = yield class_schedule_service_1.ClassScheduleService.createClassSchedule(req.body);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Class Schedule Created successfully',
            data: classSchedule
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
                message: 'An error occurred while creating the class schedule.',
                errorDetails: error.message
            });
        }
    }
});
exports.createClassSchedule = createClassSchedule;
// Get all class schedules
const getAllClassSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield class_schedule_service_1.ClassScheduleService.getAllClassSchedules();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Class schedules retrieved successfully',
            data: schedules
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'An error occurred while retrieving the class schedules.',
            errorDetails: error.message
        });
    }
});
exports.getAllClassSchedules = getAllClassSchedules;
// Update class schedule
const updateClassSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classSchedule = yield class_schedule_service_1.ClassScheduleService.updateClassSchedule(req.params.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Class schedule updated successfully',
            data: classSchedule
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'An error occurred while updating the class schedule.',
            errorDetails: error.message
        });
    }
});
exports.updateClassSchedule = updateClassSchedule;
// Delete class schedule
const deleteClassSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield class_schedule_service_1.ClassScheduleService.deleteClassSchedule(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Class schedule deleted successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'An error occurred while deleting the class schedule.',
            errorDetails: error.message
        });
    }
});
exports.deleteClassSchedule = deleteClassSchedule;
