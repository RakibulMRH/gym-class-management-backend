import { prisma } from '../config/prisma.client';

export class TrainerService {
  // Create a new trainer
  static async createTrainer(trainerDetails: any) {
    return prisma.user.create({
      data: {
        ...trainerDetails,
        role: 'TRAINER', // Ensure role is set to 'TRAINER'
      },
    });
  }

  // Update a trainer's details
  static async updateTrainer(id: any, trainerDetails: any) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: trainerDetails,
    });
  }

  // Delete a trainer by ID
  static async deleteTrainer(id: any) {
    return prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  // Fetch all trainers
  static async getTrainers() {
    return prisma.user.findMany({
      where: { role: 'TRAINER' }, // Only fetch users with the role 'TRAINER'
    });
  }
}
