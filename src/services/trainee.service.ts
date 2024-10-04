import { prisma } from '../config/prisma.client';

export class TraineeService {
  static async updateProfile(id: any, profileDetails: any) {
    try {
      return prisma.user.update({
        where: { id },
        data: profileDetails,
      });
    } catch (error) {
      const err = new Error('Validation error occurred.');
      err.name = 'ValidationError';
      throw err;
    }
  }

  static async bookClass(userId: any, classScheduleId: number) {
    const classCount = await prisma.booking.count({ where: { classScheduleId } });
    if (classCount >= 10) {
      const error = new Error('Class schedule is full. Maximum 10 trainees allowed per schedule.');
      error.name = 'BookingLimitExceeded';
      throw error;
    }

    return prisma.booking.create({
      data: {
        trainee: { connect: { id: userId } },
        classSchedule: { connect: { id: classScheduleId } },
      },
    });
  }

  static async cancelBooking(userId: any, bookingId: any) {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.traineeId !== userId) {
      const error = new Error('Booking not found or unauthorized.');
      error.name = 'UnauthorizedError';
      throw error;
    }
    
    return prisma.booking.delete({ where: { id: bookingId } });
  }

  static async getProfile(id: any) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
  
}