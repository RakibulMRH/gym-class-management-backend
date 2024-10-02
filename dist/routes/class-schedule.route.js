"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_schedule_controller_1 = require("../controllers/class-schedule.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /class-schedule/create:
 *   post:
 *     tags:
 *       - Class Scheduling
 *     summary: Create a new class schedule
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-05"
 *               time:
 *                 type: string
 *                 example: "14:00"
 *               trainerId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Class schedule created successfully
 */
router.post('/create', auth_middleware_1.authenticateJWT, class_schedule_controller_1.createClassSchedule);
/**
 * @swagger
 * /class-schedule/list:
 *   get:
 *     tags:
 *       - Class Scheduling
 *     summary: Fetch all class schedules
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of class schedules
 */
router.get('/list', auth_middleware_1.authenticateJWT, class_schedule_controller_1.getAllClassSchedules);
/**
 * @swagger
 * /class-schedule/update/{id}:
 *   put:
 *     tags:
 *       - Class Scheduling
 *     summary: Update a class schedule
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Class schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-05"
 *               time:
 *                 type: string
 *                 example: "14:00"
 *               trainerId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Class schedule updated successfully
 */
router.put('/update/:id', auth_middleware_1.authenticateJWT, class_schedule_controller_1.updateClassSchedule);
/**
 * @swagger
 * /class-schedule/delete/{id}:
 *   delete:
 *     tags:
 *       - Class Scheduling
 *     summary: Delete a class schedule
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Class schedule ID
 *     responses:
 *       200:
 *         description: Class schedule deleted successfully
 */
router.delete('/delete/:id', auth_middleware_1.authenticateJWT, class_schedule_controller_1.deleteClassSchedule);
exports.default = router;
