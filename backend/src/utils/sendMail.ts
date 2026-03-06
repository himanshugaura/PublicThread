import nodemailer from "nodemailer";
import { verificationEmailTemplate } from "./mailTemplate.js";

interface SendMailOptions {
  to: string;
  name: string;
  verificationUrl: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationMail = async ({ to, name , verificationUrl }: SendMailOptions) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Verification Email for Your Account",
    html: verificationEmailTemplate({name , verificationUrl}),
  });
};