import { Router } from 'express';
import { createTrainer, updateTrainer, deleteTrainer, getTrainers } from '../controllers/trainer.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

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
router.post('/create', authenticateJWT, roleMiddleware('ADMIN'), createTrainer);

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
router.get('/list', authenticateJWT, roleMiddleware('ADMIN'), getTrainers);

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
router.put('/update/:id', authenticateJWT, roleMiddleware('ADMIN'), updateTrainer);

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
router.delete('/delete/:id', authenticateJWT, roleMiddleware('ADMIN'), deleteTrainer);

export default router;
