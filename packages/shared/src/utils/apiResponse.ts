import { Response } from 'express';

export const apiRes = (
  res: Response,
  message: string,
  statCode: number,
  statMsg: string,
  data: any = null,
  spreadData: Boolean = false
) => {
  if (spreadData) return res.status(statCode).json({ message, status: statMsg, ...data });
  return res.status(statCode).json({
    message,
    status: statMsg,
    data,
  });
};
