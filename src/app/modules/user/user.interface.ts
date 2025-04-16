import mongoose, { Document } from "mongoose";

export type IUser = Document & {
  authId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  profile_image?: string | null;
  phone_number?: string | null;
  isPhoneNumberVerified: boolean;
  address?: string | null;
  amount: number;
  status: "active" | "deactivate";
  createdAt?: Date;
  updatedAt?: Date;
  duration_time: Date;
  subscription_status: string;
}