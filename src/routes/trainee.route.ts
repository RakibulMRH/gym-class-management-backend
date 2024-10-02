import { Router } from 'express';
import { updateProfile, bookClass, cancelBooking } from '../controllers/trainee.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

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
router.put('/update-profile', authenticateJWT, roleMiddleware('TRAINEE'), updateProfile);

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
router.post('/book-class', authenticateJWT, roleMiddleware('TRAINEE'), bookClass);

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
router.delete('/cancel-booking/:bookingId', authenticateJWT, roleMiddleware('TRAINEE'), cancelBooking);

export default router;
