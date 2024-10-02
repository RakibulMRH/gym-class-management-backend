import { prisma } from '../config/prisma.client';

export class ClassScheduleService {
  static async createClassSchedule(classDetails: any) {
    const { date, time, trainerId } = classDetails;
    const classCount = await prisma.classSchedule.count({ where: { date } });

    if (classCount >= 5) throw new Error('Cannot schedule more than 5 classes per day.');

    return prisma.classSchedule.create({
      data: { date, time, trainerId, duration: 2 },
    });
  }

  static async getAllClassSchedules() {
    return prisma.classSchedule.findMany({ include: { trainer: true } });
  }

  static async updateClassSchedule(id: any, classDetails: any) {
    return prisma.classSchedule.update({
      where: { id: Number(id) },
      data: classDetails,
    });
  }

  static async deleteClassSchedule(id: any) {
    return prisma.classSchedule.delete({ where: { id: Number(id) } });
  }
}
