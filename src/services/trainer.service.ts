import { prisma } from '../config/prisma.client';

export class TrainerService {
  // Create a new trainer
  static async createTrainer(trainerDetails: any) {
    try {
      return prisma.user.create({
        data: {
          ...trainerDetails,
          role: 'TRAINER', // Ensure role is set to 'TRAINER'
        },
      });
    } catch (error) {
      const err = new Error('Validation error occurred.');
      err.name = 'ValidationError';
      throw err;
    }
  }

  // Update a trainer's details
  static async updateTrainer(id: any, trainerDetails: any) {
    try {
      return prisma.user.update({
        where: { id: Number(id) },
        data: trainerDetails,
      });
    } catch (error) {
      const err = new Error('Validation error occurred.');
      err.name = 'ValidationError';
      throw err;
    }
  }

  // Delete a trainer by ID
  static async deleteTrainer(id: any) {
    try {
      return prisma.user.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      const err = new Error('Validation error occurred.');
      err.name = 'ValidationError';
      throw err;
    }
  }

  // Fetch all trainers
  static async getTrainers() {
    try {
      return prisma.user.findMany({
        where: { role: 'TRAINER' }, // Only fetch users with the role 'TRAINER'
      });
    } catch (error) {
      const err = new Error('Validation error occurred.');
      err.name = 'ValidationError';
      throw err;
    }
  }
}