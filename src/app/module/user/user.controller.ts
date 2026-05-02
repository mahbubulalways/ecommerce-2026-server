import type { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";
import { ApplicationError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";

// CREATE ADMIN/STUFF/SUPER ADMIN
const createAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await UserService.createAdminService(data);
    if (!result.id) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        `Failed to create ${data?.adminRole}`,
      );
    } else {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `${data?.adminRole} created successfully`,
        data: {
          email: result?.email,
        },
      });
    }
  },
);

export const userController = { createAdminController };
