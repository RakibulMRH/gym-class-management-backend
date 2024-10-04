import { prisma } from '../config/prisma.client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async register(userDetails: any) {
    const { email, password, fullName, role } = userDetails;
 
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: { email, password: hashedPassword, fullName, role },
    });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error('Invalid password');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { token };
  }
}