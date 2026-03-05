import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import type { IUser } from "../types/entity.types.js";
import { AuthProvider } from "../types/constants.types.js";

type UserModel = Model<IUser>;

const portfolioSchema = new Schema(
  {
    skills: [
      {
        type: String,
      },
    ],
    experience: [
      {
        company: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        isCurrent: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    education: [
      {
        institution: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        maxScore: {
          type: Number,
          required: true,
        },
      },
    ],
    certifications: [
      {
        name: {
          type: String,
          required: true,
        },
        issuer: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        image: {
          url: { type: String },
          publicId: { type: String },
        },
      },
    ],

    achievements: [{ type: String }],
  },
  { _id: false },
);

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    profileImage: {
      url: { type: String },
      publicId: { type: String },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
    },
    portfolio: {
      type: portfolioSchema,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
