import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name is required"),
    username: z.string().min(3, "Minimum 3 character required").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").max(30, "Username must be less than 30 characters"),
    email: z.email("Invalid email format").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const usernameCheckSchema = z.object({
  query: z.object({
    username: z.string().min(3, "Minimum 3 character required").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").max(30, "Username must be less than 30 characters"),
  }),
});