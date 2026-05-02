import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../app/errors/ApplicationError";
import { USER_STATUS } from "../generated/prisma/enums";

const userStatusThrowError = (STATUS: USER_STATUS) => {
  switch (STATUS) {
    case "BANNED":
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Your account has been banned. Please contact support for assistance.",
      );
    case "INACTIVE":
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Your account is inactive. Please activate your account to continue.",
      );
    default:
      break;
  }
};

export default userStatusThrowError;
