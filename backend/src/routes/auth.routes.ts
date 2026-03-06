import { Router } from "express";
import { register, login, googleLogin, verifyEmail, logout, checkUsername, getProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middlware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/google", googleLogin);
authRoutes.get("/verify-email/:token", authMiddleware, verifyEmail);
authRoutes.post("logout", logout);
authRoutes.get("/checkUsername" , authMiddleware, checkUsername);
authRoutes.get("/profile", authMiddleware, getProfile);

export default authRoutes;