import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {
  userId: string;
  role: Role;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (userId: string, role: Role): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}; 