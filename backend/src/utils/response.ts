import type { Response } from "express";

interface SuccessPayload<T> {
  message?: string;
  data?: T;
}
export const sendRes = <T>(
  res: Response,
  statusCode = 200,
  payload?: SuccessPayload<T>
) => {
  return res.status(statusCode).json({
    success: true,
    ...payload,
  });
};
