import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: { status: any; message: any; }, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
