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
    res.status(400).json({ success: false, errors });
    return;
  }

  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const dto = new LoginDTO();
  Object.assign(dto, req.body);

  const errors = await validate(dto);
  if (errors.length) {
    res.status(400).json({ success: false, errors });
    return;
  }

  try {
    const { token } = await AuthService.login(req.body.email, req.body.password);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
