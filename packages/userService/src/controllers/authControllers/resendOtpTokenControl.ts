import { Request, Response } from 'express';
import { IResendOtpRequest, apiRes, HttpStatusCodes, HttpStatusMessages } from '@ecommerce/shared';
import { findUserByEmail, updateUserSession } from '../../dbCruds/authCrud';
import { generateOtp } from '../../utils/index';

const resendOtpController = async (req: Request, res: Response) => {
  try {
    const { email, sendType }: IResendOtpRequest = req.body;
    if ( !['otp', 'token'].includes(sendType)) {
      return apiRes(
        res,
        'Invalid send type',
        HttpStatusCodes.BAD_REQUEST,
        HttpStatusMessages.FAILED
      );
    }
    const userEmail = email.toLowerCase();
    const user = await findUserByEmail(userEmail);
    if (!user) {
      return apiRes(
        res,
        'User not found',
        HttpStatusCodes.FORBIDDEN,
        HttpStatusMessages.FAILED
      );
    }
    if (sendType === 'otp') {
        if (user.emailVerified) {
        return apiRes(
            res,
            'Your account is already verified',
            HttpStatusCodes.FORBIDDEN,
            HttpStatusMessages.FAILED
        );
        }
        const otp = generateOtp();
        await updateUserSession(user.id, {otp: otp, otpExpiresAt: true, otpUsed: false});
        return apiRes(
        res,
        'OTP sent successfully',
        HttpStatusCodes.OK,
        HttpStatusMessages.SUCCESS
        );
    }
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

export default resendOtpController;
