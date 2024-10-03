import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validate } from 'class-validator';
import { LoginDTO } from '../models/dto/login.dto';
import { RegisterDTO } from '../models/dto/register.dto';

export const register = async (req: Request, res: Response): Promise<void> => {
  const dto = new RegisterDTO();
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
    const user = await AuthService.register(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
      errorDetails: (error as Error).message
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const dto = new LoginDTO();
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
    const { token } = await AuthService.login(req.body.email, req.body.password);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: { token }
    });
  } catch (error) {
    if ((error as Error).name === 'UnauthorizedError') {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: (error as Error).message
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