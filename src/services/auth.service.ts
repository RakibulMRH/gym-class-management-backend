import { prisma } from '../config/prisma.client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async register(userDetails: any) {
    const { email, password, fullName, role } = userDetails;
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: { email, password: hashedPassword, fullName, role },
    });
  }

  static async login(email: any, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { token };
  }
}
