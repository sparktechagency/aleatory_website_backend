import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchasync";
import { IReqUser } from "../auth/auth.interface";
import sendResponse from "../../../shared/sendResponse";

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateMyProfile(req as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getProfile(req.user as IReqUser);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUSerAccount(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account deleted!",
  });
});

export const UserController = {
  deleteMyAccount,
  getProfile,
  updateProfile,
};

