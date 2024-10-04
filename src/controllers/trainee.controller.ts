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
    console.log('User ID:', req.user?.id); // Log the user ID
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
    console.log('User ID:', req.user?.id); // Log the user ID
    await TraineeService.cancelBooking(req.user!.id, Number(req.params.bookingId));
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
 
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenUserId = req.user!.id;
    const { id } = req.params;

    // Check if the id from the request matches the id from the token
    if (Number(id) !== Number(tokenUserId)) {
      res.status(403).json({
        success: false,
        message: 'Forbidden. You are not allowed to access this profile.',
      });
      return;
    }

    const trainee = await TraineeService.getProfile(tokenUserId);
    if (!trainee) {
      res.status(404).json({
        success: false,
        message: 'Profile not found.',
      });
      return;
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Profile retrieved successfully',
      data: trainee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'An error occurred while retrieving the profile.',
      errorDetails: {
        field: 'profile',
        message: (error as Error).message
      }
    });
  }
}; 