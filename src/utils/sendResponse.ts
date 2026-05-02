import type { Response } from "express";

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
};

export const sendResponse = <T>(res: Response, payload: TApiResponse<T>) => {
  const { success, message, statusCode, data } = payload;

  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    data: data || null,
  });
};
