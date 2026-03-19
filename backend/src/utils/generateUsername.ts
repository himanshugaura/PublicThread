import crypto from "crypto";

export const generateTempUsername = async () => {
  const random =  crypto.randomBytes(3).toString("hex");
  return `user_${random}`;
};