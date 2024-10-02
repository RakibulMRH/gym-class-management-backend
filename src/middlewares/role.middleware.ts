import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (role: 'ADMIN' | 'TRAINER' | 'TRAINEE') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ success: false, message: 'Forbidden access: Insufficient permissions.' });
      return;  
    }
    next();  
  };
};
