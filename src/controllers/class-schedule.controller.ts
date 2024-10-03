import { Request, Response } from 'express';
import { ClassScheduleService } from '../services/class-schedule.service';
import { validate } from 'class-validator';
import { CreateClassScheduleDTO } from '../models/dto/create-class-schedule.dto';

// Create class schedule
export const createClassSchedule = async (req: Request, res: Response): Promise<void> => {
  const dto = new CreateClassScheduleDTO();
  Object.assign(dto, req.body);

  const errors = await validate(dto);
  if (errors.length) {
    res.status(400).json({
      success: false,
      message: 'Validation error occurred.',
      errorDetails: errors.map(error => ({
        field: error.property,
        message: Object.values(error.constraints || {}).join(', ')
      }))
    });
    return;
  }

  try {
    const classSchedule = await ClassScheduleService.createClassSchedule(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Class booked successfully',
      data: classSchedule
    });
  } catch (error) {
    if ((error as Error).name === 'BookingLimitExceeded') {
      res.status(400).json({
        success: false,
        message: 'Class schedule is full. Maximum 10 trainees allowed per schedule.'
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message,
        errorDetails: (error as Error).message
      });
    }
  }
};

// Get all class schedules
export const getAllClassSchedules = async (req: Request, res: Response): Promise<void> => {
  try {
    const schedules = await ClassScheduleService.getAllClassSchedules();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Class schedules retrieved successfully',
      data: schedules
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
      errorDetails: (error as Error).message
    });
  }
};

// Update class schedule
export const updateClassSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const classSchedule = await ClassScheduleService.updateClassSchedule(req.params.id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Class schedule updated successfully',
      data: classSchedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
      errorDetails: (error as Error).message
    });
  }
};

// Delete class schedule
export const deleteClassSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    await ClassScheduleService.deleteClassSchedule(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Class schedule deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
      errorDetails: (error as Error).message
    });
  }
};