import { Request, Response } from 'express';
import { TrainerService } from '../services/trainer.service';

export const createTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await TrainerService.createTrainer(req.body);
    res.status(201).json({ success: true, trainer });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const updateTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await TrainerService.updateTrainer(req.params.id, req.body);
    res.status(200).json({ success: true, trainer });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const deleteTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    await TrainerService.deleteTrainer(req.params.id);
    res.status(200).json({ success: true, message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const getTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await TrainerService.getTrainers();
    res.status(200).json({ success: true, trainers });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
