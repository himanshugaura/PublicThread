import type { Types } from "mongoose";
import type { AuthProvider, PostStatus } from "./constants.types.js";

export interface Portfolio  {
    skills: string[];
    experience: {
        company: string;
        role: string;
        from: Date;
        to: Date | "Present";
        description: string;
    }
    education: {
        institution: string;
        degree: string;
        duration: string;
        score: Number;
        maxScore: Number;
    }
    certifications: {
        name: string;
        issuer: string;
        date: string;
        image: {
            url: string;
            publicId: string;
        }
    }
    achievements: string[];
}

export interface IUser {
    name: string;
    username: string;
    email: string;
    password: string;
    portfolio : Portfolio;   
    isVerified: boolean;
    profileImage: {
        url: string;
        publicId: string;
    }
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    googleId?: string;
    provider: AuthProvider;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateToken(): string;
}

export interface IPost {
    title: string;
    description: string;
    owner: Types.ObjectId;
    admins: Types.ObjectId[];
    interestedUsers: Types.ObjectId[];
    maxUsers: number;
    eligibility: string[];
    skillsRequired: string[];
    keywords: string[];
    status: PostStatus;
    createdAt: Date;
    updatedAt: Date;
}
