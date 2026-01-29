import { Response } from 'express';

export const apiRes = (
  res: Response,
  message: string,
  statCode: number,
  statMsg: string,
  data: any = null
) => {
  return res.status(statCode).json({
    message,
    status: statMsg,
    data,
  });
};
