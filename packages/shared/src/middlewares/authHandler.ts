require('dotenv').config();
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { apiRes } from '../utils/apiResponse';
import { HttpStatusCodes } from '../utils/statusCodes';
import { HttpStatusMessages } from '../utils/statusResponse';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        isActive: Boolean;
        emailVerified: Boolean;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header('Authorization') || '';
    if (token.startsWith('Bearer ')) token = token.slice(7);

    if (!token) {
      return apiRes(
        res,
        'Authentication required.',
        HttpStatusCodes.UNAUTHORIZED,
        HttpStatusMessages.FAILED
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
      isActive: Boolean;
      emailVerified: Boolean;
    };

    //if not email verified
    if (!decoded.emailVerified) {
      return apiRes(
        res,
        'Your account is not verified..',
        HttpStatusCodes.UNAUTHORIZED,
        HttpStatusMessages.FAILED
      );
    }

    if (!decoded.isActive) {
      return apiRes(
        res,
        'Account is deactivated.',
        HttpStatusCodes.UNAUTHORIZED,
        HttpStatusMessages.FAILED
      );
    }

    req.user = decoded;
    // req.token = token;
    next();
  } catch (error: any) {
    console.log(`error: ${error}`);
    if (error.name === 'JsonWebTokenError') {
      return apiRes(res, 'Invalid token.', HttpStatusCodes.UNAUTHORIZED, HttpStatusMessages.FAILED);
    }

    if (error.name === 'TokenExpiredError') {
      return apiRes(
        res,
        'Session expired.',
        HttpStatusCodes.UNAUTHORIZED,
        HttpStatusMessages.FAILED
      );
    }

    next(error);
  }
};
