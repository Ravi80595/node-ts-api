import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';


interface DecodedToken {
    id: string;
    iat?: number;
    exp?: number;
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: {
          id: string;
          role: string;
        };
      }
    }
  }


  export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      const user: IUser | null = await User.findById(decoded.id);
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      req.user = { id: user._id.toString(), role: user.role };
      next();
    } catch (error) {
      console.error('Error during Auth middleware:', error);
      res.status(400).json({ message: 'Invalid token.' });
    }
  };