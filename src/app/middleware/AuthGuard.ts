import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { Config } from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { ApplicationError } from "../errors/ApplicationError";
import { jwtHelper } from "../../helper/jwtHelper";
import { prisma } from "../../lib/prisma";
import userStatusThrowError from "../../utils/userStatusThrowError";

const AuthGuard = (...roles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1] as string;

    if (!token) {
      throw new ApplicationError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access. You must be logged in to continue.",
      );
    }

    const token_info = (await jwtHelper.verifyToken(
      token,
      Config.ACCESS_TOKEN_SECRET as string,
    )) as JwtPayload;

    if (!token_info) {
      throw new ApplicationError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access. You must be logged in to continue.",
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email: token_info?.email,
        role: token_info?.role,
      },
    });

    if (!user?.id) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        "Unauthorized access. You must be logged in to continue.",
      );
    }
    // !user?.is_phone_verified ||
    if (!user?.isVerified) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Your account is not verified. Please verify your phone number to continue.",
      );
    }
    if (user.isDeleted) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Your account has been deleted. Please contact support if you think this is a mistake.",
      );
    }

    const STATUS = user?.status;
    if (STATUS) {
      userStatusThrowError(STATUS);
    }

    if (roles.length && !roles.includes(token_info.role)) {
      throw new ApplicationError(
        StatusCodes.FORBIDDEN,
        "Access forbidden. You do not have the required permissions to perform this action.",
      );
    }

    req.user = token_info;
    next();
  });
};

export default AuthGuard;
