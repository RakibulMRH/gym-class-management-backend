"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainer_controller_1 = require("../controllers/trainer.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /trainer/create:
 *   post:
 *     tags:
 *       - Trainer Management
 *     summary: Create a new trainer (Admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Trainer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Trainer created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "TRAINER"
 *       400:
 *         description: Validation error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error occurred."
 *                 errorDetails:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       example: "email"
 *                     message:
 *                       type: string
 *                       example: "Invalid email format."
 */
router.post('/create', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.createTrainer);
/**
 * @swagger
 * /trainer/update/{id}:
 *   put:
 *     tags:
 *       - Trainer Management
 *     summary: Update a trainer's details (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Trainer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Trainer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Trainer updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "TRAINER"
 *       400:
 *         description: Validation error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error occurred."
 *                 errorDetails:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       example: "email"
 *                     message:
 *                       type: string
 *                       example: "Invalid email format."
 */
router.put('/update/:id', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.updateTrainer);
/**
 * @swagger
 * /trainer/delete/{id}:
 *   delete:
 *     tags:
 *       - Trainer Management
 *     summary: Delete a trainer (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Trainer ID
 *     responses:
 *       200:
 *         description: Trainer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Trainer deleted successfully"
 *       400:
 *         description: Validation error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error occurred."
 *                 errorDetails:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       example: "id"
 *                     message:
 *                       type: string
 *                       example: "Invalid trainer ID."
 */
router.delete('/delete/:id', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.deleteTrainer);
/**
 * @swagger
 * /trainer/list:
 *   get:
 *     tags:
 *       - Trainer Management
 *     summary: Fetch all trainers (Admin only)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of trainers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Trainers retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       role:
 *                         type: string
 *                         example: "TRAINER"
 *       400:
 *         description: Validation error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error occurred."
 *                 errorDetails:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       example: "role"
 *                     message:
 *                       type: string
 *                       example: "Invalid role."
 */
router.get('/list', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.getTrainers);
exports.default = router;
