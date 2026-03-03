import { AppError } from "./error.js";

export const throwError = (
  statusCode: number,
  message: string,
  errors: string[] = []
): never => {
  throw new AppError(statusCode, message, errors);
};