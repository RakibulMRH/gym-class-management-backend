import { Router } from 'express';
import { updateProfile, bookClass, cancelBooking, getProfile } from '../controllers/trainee.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * /api/trainee/profile/{id}:
 *  get:
 *   tags:
 *    - Trainee Management
 *   summary: Get trainee profile (Trainee only)
 *   security:
 *    - BearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID of the trainee
 *   responses:
 *    200:
 *     description: Profile retrieved successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         id:
 *          type: integer
 *         name:
 *          type: string
 *         email:
 *          type: string
 *         phone:
 *          type: string
 *    403:
 *     description: Forbidden. You are not allowed to access this profile.
 *    404:
 *     description: Profile not found.
 *    400:
 *     description: An error occurred while retrieving the profile.
 */
 
router.get('/profile/:id', authenticateJWT, roleMiddleware('TRAINEE'), getProfile); // Define the route for getting the profile

/**
 * @swagger
 * /api/trainee/update-profile:
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
 *                   example: "Profile updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
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
router.put('/update-profile', authenticateJWT, roleMiddleware('TRAINEE'), updateProfile);

/**
 * @swagger
 * /api/trainee/book-class:
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
 *                   example: "Class booked successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     traineeId:
 *                       type: integer
 *                       example: 1
 *                     classScheduleId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       example: "2024-10-05T14:00:00.000Z"
 *       400:
 *         description: Booking limit exceeded or validation error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Class schedule is full. Maximum 10 trainees allowed per schedule."
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Validation error occurred."
 *                     errorDetails:
 *                       type: object
 *                       properties:
 *                         field:
 *                           type: string
 *                           example: "classScheduleId"
 *                         message:
 *                           type: string
 *                           example: "Invalid class schedule ID."
 */
router.post('/book-class', authenticateJWT, roleMiddleware('TRAINEE'), bookClass);

/**
 * @swagger
 * /api/trainee/cancel-booking/{bookingId}:
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
 *                   example: "Booking cancelled successfully"
 *       401:
 *         description: Unauthorized access
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
 *                   example: "Unauthorized access."
 *                 errorDetails:
 *                   type: string
 *                   example: "You must be an admin to perform this action."
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
 *                       example: "bookingId"
 *                     message:
 *                       type: string
 *                       example: "Invalid booking ID."
 */
router.delete('/cancel-booking/:bookingId', authenticateJWT, roleMiddleware('TRAINEE'), cancelBooking);

export default router;