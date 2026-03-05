import { ZodType, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/throwError.js";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => issue.message);

        throwError(400, "Validation failed", errors);
      }

      next(error);
    }
  };