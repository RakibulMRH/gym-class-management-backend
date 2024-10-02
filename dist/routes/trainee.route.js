"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainee_controller_1 = require("../controllers/trainee.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /trainee/update-profile:
 *   put:
 *     tags:
 *       - Trainee Management
 *     summary: Update trainee profile (Trainee only)
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
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/update-profile', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('TRAINEE'), trainee_controller_1.updateProfile);
/**
 * @swagger
 * /trainee/book-class:
 *   post:
 *     tags:
 *       - Class Booking
 *     summary: Book a class (Trainee only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classScheduleId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Class booked successfully
 */
router.post('/book-class', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('TRAINEE'), trainee_controller_1.bookClass);
/**
 * @swagger
 * /trainee/cancel-booking/{bookingId}:
 *   delete:
 *     tags:
 *       - Class Booking
 *     summary: Cancel a booking (Trainee only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */
router.delete('/cancel-booking/:bookingId', auth_middleware_1.authenticateJWT, (0, role_middleware_1.roleMiddleware)('TRAINEE'), trainee_controller_1.cancelBooking);
exports.default = router;
