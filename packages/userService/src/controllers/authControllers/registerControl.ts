import { Request, Response } from 'express';
import { IRegisterRequest, apiRes, HttpStatusCodes, HttpStatusMessages } from '@ecommerce/shared';
import { findUserByEmail, saveUser, createUserSession } from '../../dbCruds/authCrud';
import { hashPassword, generateOtp } from '../../utils/index';

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, firstName, lastName }: IRegisterRequest = req.body;
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return apiRes(
        res,
        'All fields are required',
        HttpStatusCodes.BAD_REQUEST,
        HttpStatusMessages.FAILED
      );
    }
    if (password.length < 8) {
      return apiRes(
        res,
        'Password must be at least 8 characters',
        HttpStatusCodes.BAD_REQUEST,
        HttpStatusMessages.FAILED
      );
    }
    if (password !== confirmPassword) {
      return apiRes(
        res,
        'passwords do not match',
        HttpStatusCodes.BAD_REQUEST,
        HttpStatusMessages.FAILED
      );
    }
    const userEmail = email.toLowerCase();
    const user = await findUserByEmail(userEmail);
    if (user) {
      return apiRes(
        res,
        'User already exists',
        HttpStatusCodes.CONFLICT,
        HttpStatusMessages.FAILED
      );
    }
    // (firstName: string, lastName: string, email: string, password: string)
    const savedUser = await saveUser(firstName, lastName, userEmail, await hashPassword(password));
    if (!savedUser) {
      return apiRes(
        res,
        'User registration failed',
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        HttpStatusMessages.FAILED
      );
    }
    const otp = generateOtp();
    await createUserSession(savedUser.id, otp);
    // send to the user (to be implemented later)
    return apiRes(
      res,
      'user registered successfully',
      HttpStatusCodes.CREATED,
      HttpStatusMessages.SUCCESS
    );
  } catch (error) {
    console.log(error);
    return apiRes(
      res,
      'User registration failed',
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      HttpStatusMessages.FAILED
    );
  }
};

export default registerController;
