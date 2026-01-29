import { Response } from 'express';
export declare const apiRes: (res: Response, message: string, statCode: number, statMsg: string, data?: any) => Response<any, Record<string, any>>;
