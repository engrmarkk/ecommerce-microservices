import { Request, Response } from 'express';
import {
  IUserDetailsRequest,
  apiRes,
  HttpStatusCodes,
  HttpStatusMessages,
} from '@ecommerce/shared';
import { findUserById } from '../../dbCruds/authCrud';

const userDetailsController = async (req: Request, res: Response) => {
  const userDetails: IUserDetailsRequest = req.user as IUserDetailsRequest;
  const user = await findUserById(userDetails?.userId);
  if (!user) {
    return apiRes(res, 'User not found', HttpStatusCodes.FORBIDDEN, HttpStatusMessages.FAILED);
  }
  return apiRes(res, 'user details', HttpStatusCodes.OK, HttpStatusMessages.SUCCESS, {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

export default userDetailsController;
