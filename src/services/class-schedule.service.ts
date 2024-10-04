import { prisma } from '../config/prisma.client';

export class ClassScheduleService {
  static async createClassSchedule(classDetails: {
    date: string;
    time: string;
    duration: number;
    trainerId?: number;
  }) {
    const { date, time, duration, trainerId } = classDetails;

    // Ensure date is in ISO-8601 format
    const isoDate = new Date(date).toISOString();

    // Validate class duration
    if (duration !== 2) {
      const error = new Error('Class duration must be exactly 2 hours.');
      error.name = 'InvalidDuration';
      throw error;
    }

    // Validate max 5 schedules per day
    const classCount = await prisma.classSchedule.count({
      where: {
        date: isoDate,
      },
    });

    if (classCount >= 5) {
      const error = new Error('Class schedule is full. Maximum 5 schedules allowed per day.');
      error.name = 'ScheduleLimitExceeded';
      throw error;
    }

    // Check for clashing schedules
    const startTime = new Date(`${isoDate}T${time}`);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000); // duration in hours

    const clashingSchedules = await prisma.classSchedule.findMany({
      where: {
        date: isoDate,
        OR: [
          {
            time: {
              lte: endTime.toISOString(),
            },
          },
          {
            time: {
              gte: startTime.toISOString(),
            },
          },
        ],
      },
    });

    if (clashingSchedules.length > 0) {
      const error = new Error('Class schedule clashes with an existing schedule.');
      error.name = 'ScheduleClash';
      throw error;
    }

    // Create class schedule
    const data: any = {
      date: isoDate,
      time,
      duration,
    };

    if (trainerId !== undefined) {
      data.trainer = { connect: { id: trainerId } };
    }

    return prisma.classSchedule.create({
      data,
    });
  }

  static async getAllClassSchedules() {
    return prisma.classSchedule.findMany({ include: { trainer: true } });
  }

  static async updateClassSchedule(id: any, classDetails: any) {
    const { trainerId, date, time, duration } = classDetails;

    // Validate trainerId if provided
    if (trainerId !== undefined) {
      const trainer = await prisma.user.findUnique({
        where: { id: trainerId },
      });

      if (!trainer || trainer.role !== 'TRAINER') {
        const error = new Error('Invalid trainerId. Trainer does not exist or is not a trainer.');
        error.name = 'InvalidTrainerId';
        throw error;
      }
    }

    // Ensure date is in ISO-8601 format
    const isoDate = new Date(date).toISOString();

    return prisma.classSchedule.update({
      where: { id: Number(id) }, // Convert id to integer
      data: {
        date: isoDate,
        time,
        trainerId,
        duration,
      },
    });
  }

  static async deleteClassSchedule(id: any) {
    return prisma.classSchedule.delete({ where: { id: Number(id) } }); // Convert id to integer
  }
}