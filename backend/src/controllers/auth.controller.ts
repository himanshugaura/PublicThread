import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { AuthProvider } from "../types/constants.types.js";
import { sendResponse } from "../utils/response.js";
import { throwError } from "../utils/throwError.js";
import { generateEmailVerificationToken } from "../utils/generateEmailToken.js";
import crypto from "crypto";
import { sendVerificationMail } from "../utils/sendMail.js";
import { OAuth2Client } from "google-auth-library";

export const register = asyncHandler(async (req, res) => {
  const { name, username , email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throwError(409, "Account already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
    provider: AuthProvider.LOCAL,
  });

  const { token, hashedToken } = generateEmailVerificationToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await user.save();

  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify-email/${token}`;

  await sendVerificationMail({
    to: user.email,
    name: user.name,
    verificationUrl,
  });


  const jwtToken = user.generateToken();

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }); 

  return sendResponse(res, 201, {
    message: "User registered successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if (!user) {
    throwError(401, "User doesn't exist with this email");
  }

  const isMatch = await user?.comparePassword(password);

  if (!isMatch) {
    throwError(401, "Invalid credentials");
  }

  res.cookie("token", user?.generateToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, 200, {
    message: "User logged in successfully",
  }); 
});

export const checkUsername = asyncHandler(async (req, res) => {
  const { username } = req.query;
  
  const existingUser = await User.findOne({ username });
  
  if (existingUser) { 
    throwError(409, "Username not available");
  }

  return sendResponse(res, 200, {
    message: "Username is available",
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throwError(404, "User not found");
  }

  return sendResponse(res, 200, {
    message: "User profile fetched successfully",
    data: user,
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params as { token: string };

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: new Date() },
  });

 if (!user) {
  throwError(400, "Invalid or expired verification link");
  return;
}

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  return sendResponse(res, 200, {
    message: "Email verified successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return sendResponse(res, 200, {
    message: "User logged out successfully",
  });
});


export const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;
  
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throwError(401,"Invalid Google token");
    return;
  }

  const { email, name, picture } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      name,
      profileImage: {
        url: picture || "",
        publicId: "",
      },
      googleId: payload.sub,
      provider: AuthProvider.GOOGLE,
      isVerified: true,
    });
  }

  const jwtToken = user.generateToken();

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, 200, {
    message: "Google login successful",
  });
});