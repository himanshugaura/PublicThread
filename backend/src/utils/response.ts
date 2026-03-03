import type { Response } from "express";

interface SuccessResponse<T> {
  message?: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  statusCode = 200,
  payload?: SuccessResponse<T>
) => {
  return res.status(statusCode).json({
    success: true,
    ...payload,
  });
};