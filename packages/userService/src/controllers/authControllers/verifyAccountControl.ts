import { Request, Response } from 'express';
import { IVerifyAccountRequest, apiRes, HttpStatusCodes, HttpStatusMessages } from '@ecommerce/shared';
import { findUserByEmail, updateLastLogin, updateUserSession, getUserSession, updateEmailVerified } from '../../dbCruds/authCrud';
import { generateToken } from '../../utils/index';

const verifyAccountController = async (req: Request, res: Response) => {
  const { email, otp }: IVerifyAccountRequest = req.body;
  if (!email || !otp) {
    return apiRes(
      res,
      'email and otp are required',
      HttpStatusCodes.BAD_REQUEST,
      HttpStatusMessages.FAILED
    );
  }
  const userEmail = email.toLowerCase();
  const user = await findUserByEmail(userEmail);
  if (!user) {
    return apiRes(res, 'User not found', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  if (!user.isActive) {
    return apiRes(
      res,
      'Your account is not active',
      HttpStatusCodes.FORBIDDEN,
      HttpStatusMessages.FAILED
    );
  }
  if (user.emailVerified) {
    return apiRes(
      res,
      'Your account is already verified',
      HttpStatusCodes.FORBIDDEN,
      HttpStatusMessages.FAILED
    );
  }
  const userSession = await getUserSession(user.id);
  if (!userSession) {
    return apiRes(res, 'User not found', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  if (userSession.otp !== otp) {
    return apiRes(res, 'Invalid otp', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  if (!userSession.otpExpiresAt || userSession.otpExpiresAt < new Date()) {
    return apiRes(res, 'Otp expired', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  if (userSession.otpUsed) {
    return apiRes(res, 'Otp already used', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  await updateUserSession(user.id, { otpUsed: true });
  await updateEmailVerified(user.id);
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

export default verifyAccountController;
