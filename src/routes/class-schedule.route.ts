import { Router } from 'express';
import {
  createClassSchedule,
  getAllClassSchedules,
  updateClassSchedule,
  deleteClassSchedule,
} from '../controllers/class-schedule.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

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
 *                 example: 1
 *               duration:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Class schedule created successfully
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
 *                   example: "Class schedule created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     date:
 *                       type: string
 *                       example: "2024-10-05T00:00:00.000Z"
 *                     time:
 *                       type: string
 *                       example: "14:00"
 *                     trainerId:
 *                       type: integer
 *                       example: 1
 *                     duration:
 *                       type: integer
 *                       example: 2
 */
router.post('/create', authenticateJWT, roleMiddleware('ADMIN'), createClassSchedule);

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
 *                   example: "Class schedules retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         example: "2024-10-05T00:00:00.000Z"
 *                       time:
 *                         type: string
 *                         example: "14:00"
 *                       trainerId:
 *                         type: integer
 *                         example: 1
 *                       duration:
 *                         type: integer
 *                         example: 2
 */
router.get('/list', authenticateJWT, getAllClassSchedules);

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
 *               duration:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Class schedule updated successfully
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
 *                   example: "Class schedule updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     date:
 *                       type: string
 *                       example: "2024-10-05T00:00:00.000Z"
 *                     time:
 *                       type: string
 *                       example: "14:00"
 *                     trainerId:
 *                       type: integer
 *                       example: 1
 *                     duration:
 *                       type: integer
 *                       example: 2
 */
router.put('/update/:id', authenticateJWT, roleMiddleware('ADMIN'), updateClassSchedule);

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
 *                   example: "Class schedule deleted successfully"
 */
router.delete('/delete/:id', authenticateJWT, roleMiddleware('ADMIN'), deleteClassSchedule);

export default router;