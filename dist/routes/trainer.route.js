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
 *               email:
 *                 type: string
 *                 example: trainer@example.com
 *               fullName:
 *                 type: string
 *                 example: John Trainer
 *     responses:
 *       201:
 *         description: Trainer created successfully
 */
router.post('/create', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.createTrainer);
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
 */
router.get('/list', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.getTrainers);
/**
 * @swagger
 * /trainer/update/{id}:
 *   put:
 *     tags:
 *       - Trainer Management
 *     summary: Update a trainer (Admin only)
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
 *         description: Trainer updated successfully
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
 */
router.delete('/delete/:id', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('ADMIN'), trainer_controller_1.deleteTrainer);
exports.default = router;
