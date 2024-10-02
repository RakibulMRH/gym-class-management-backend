import { prisma } from '../config/prisma.client';

export class TraineeService {
  static async updateProfile(id: any, profileDetails: any) {
    return prisma.user.update({
      where: { id },
      data: profileDetails,
    });
  }

  static async bookClass(userId: any, classScheduleId: any) {
    const classCount = await prisma.booking.count({ where: { classScheduleId } });
    if (classCount >= 10) throw new Error('Class is full.');

    return prisma.booking.create({
      data: {
        trainee: { connect: { id: userId } },
        classSchedule: { connect: { id: classScheduleId } },
      },
    });
  }

  static async cancelBooking(userId: any, bookingId: string) {
    const booking = await prisma.booking.findUnique({ where: { id: Number(bookingId) } });
    if (!booking || booking.traineeId !== userId) throw new Error('Booking not found or unauthorized.');
    
    return prisma.booking.delete({ where: { id: Number(bookingId) } });
  }
}
