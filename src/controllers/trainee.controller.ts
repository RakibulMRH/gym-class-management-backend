import { Request, Response } from 'express';
import { TraineeService } from '../services/trainee.service';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainee = await TraineeService.updateProfile(req.user!.id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: trainee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation error occurred.',
      errorDetails: {
        field: 'profile',
        message: (error as Error).message
      }
    });
  }
};

export const bookClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await TraineeService.bookClass(req.user!.id, req.body.classScheduleId);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Class booked successfully',
      data: booking
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
        message: 'Validation error occurred.',
        errorDetails: {
          field: 'classScheduleId',
          message: (error as Error).message
        }
      });
    }
  }
};

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    await TraineeService.cancelBooking(req.user!.id, req.params.bookingId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    if ((error as Error).name === 'UnauthorizedError') {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: 'You must be an admin to perform this action.'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Validation error occurred.',
        errorDetails: {
          field: 'bookingId',
          message: (error as Error).message
        }
      });
    }
  }
};