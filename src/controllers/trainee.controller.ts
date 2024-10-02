import { Request, Response } from 'express';
import { TraineeService } from '../services/trainee.service';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainee = await TraineeService.updateProfile(req.user!.id, req.body);
    res.status(200).json({ success: true, trainee });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const bookClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await TraineeService.bookClass(req.user!.id, req.body.classScheduleId);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    await TraineeService.cancelBooking(req.user!.id, req.params.bookingId);
    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
