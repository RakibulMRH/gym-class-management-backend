import { Request, Response } from 'express';
import { TrainerService } from '../services/trainer.service';

export const createTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await TrainerService.createTrainer(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Trainer created successfully',
      data: trainer
    });
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error occurred.',
        errorDetails: {
          field: 'trainer',
          message: (error as Error).message
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
        errorDetails: (error as Error).message
      });
    }
  }
};

export const updateTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await TrainerService.updateTrainer(req.params.id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Trainer updated successfully',
      data: trainer
    });
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error occurred.',
        errorDetails: {
          field: 'trainer',
          message: (error as Error).message
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
        errorDetails: (error as Error).message
      });
    }
  }
};

export const deleteTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    await TrainerService.deleteTrainer(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Trainer deleted successfully'
    });
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error occurred.',
        errorDetails: {
          field: 'trainer',
          message: (error as Error).message
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
        errorDetails: (error as Error).message
      });
    }
  }
};

export const getTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await TrainerService.getTrainers();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Trainers retrieved successfully',
      data: trainers
    });
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error occurred.',
        errorDetails: {
          field: 'trainer',
          message: (error as Error).message
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
        errorDetails: (error as Error).message
      });
    }
  }
};