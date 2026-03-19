import { Router } from "express";
import { register, login, googleLogin, verifyEmail, logout, checkUsername, getProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middlware.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema),register);
authRoutes.post("/login", validate(loginSchema) , login);
authRoutes.post("/google", googleLogin);
authRoutes.get("/verify-email/:token",  verifyEmail);
authRoutes.post("logout", logout);
authRoutes.get("/checkUsername", checkUsername);
authRoutes.get("/profile", authMiddleware, getProfile);

export default authRoutes;