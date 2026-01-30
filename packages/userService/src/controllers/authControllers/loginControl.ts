import { Request, Response } from 'express';
import { ILoginRequest, apiRes, HttpStatusCodes, HttpStatusMessages } from '@ecommerce/shared';
import { findUserByEmail, updateLastLogin } from '../../dbCruds/authCrud';
import { verifyPassword, generateToken } from '../../utils/index';

const loginController = async (req: Request, res: Response) => {
  const { email, password }: ILoginRequest = req.body;
  if (!email || !password) {
    return apiRes(
      res,
      'email and password are required',
      HttpStatusCodes.BAD_REQUEST,
      HttpStatusMessages.FAILED
    );
  }
  const userEmail = email.toLowerCase();
  const user = await findUserByEmail(userEmail);
  if (!user || !(await verifyPassword(password, user.password))) {
    return apiRes(res, 'Invalid credentials', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  if (!user.isActive) {
    return apiRes(
      res,
      'Your account is not active',
      HttpStatusCodes.FORBIDDEN,
      HttpStatusMessages.FAILED
    );
  }
  if (!user.emailVerified) {
    return apiRes(
      res,
      'Your account is not verified',
      HttpStatusCodes.FORBIDDEN,
      HttpStatusMessages.FAILED
    );
  }
  const accessToken = await generateToken({
    userId: user.id,
    email: user.email,
    isActive: user.isActive,
    emailVerified: user.emailVerified
  });
  await updateLastLogin(user.id);
  return apiRes(
    res,
    'user logged in successfully',
    HttpStatusCodes.OK,
    HttpStatusMessages.SUCCESS,
    { accessToken }
  );
};

export default loginController;
