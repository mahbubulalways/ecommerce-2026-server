import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { ApplicationError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";

// & LOGIN USER
const loginUserController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.userLoginService(body);
  if (!result?.accessToken) {
    throw new ApplicationError(StatusCodes.BAD_REQUEST, "Invalid credentials.");
  } else {
    res.cookie("token", result.refreshToken, {
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      message: "Login successful.",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

//& EMAIL VERIFICATION
const emailVerificationController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.emailVerificationService(body);
  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "The verification code entered is invalid or has expired. Please try again.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Email has been verified successfully!",
      statusCode: StatusCodes.OK,
    });
  }
});

//& REQUEST FOR NEW CODE
const newEmailVerificationCodeGenerateController = catchAsync(
  async (req, res) => {
    const body = req.body;
    const result = await AuthService.newEmailVerificationCodeGenerateService(
      body.email,
    );
    if (!result) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Unable to generate a new verification code. Please try again later.",
      );
    } else {
      sendResponse(res, {
        success: true,
        message: "A new verification code has been sent to your email address.",
        statusCode: StatusCodes.OK,
        data: result,
      });
    }
  },
);

// & FIND ACCOUNT FOR FORGOT PASSWORD
const findAccountController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.findAccountService(body);

  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "No account found with the provided information. Please try again.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Password reset link has been sent to your email.",
      statusCode: StatusCodes.OK,
    });
  }
});
// & PASSWORD RESEER
const resetPasswordController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.resetPasswordService(body);

  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "Failed to reset password",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Password reset successfully.",
      statusCode: StatusCodes.OK,
    });
  }
});

export const AuthController = {
  loginUserController,
  emailVerificationController,
  newEmailVerificationCodeGenerateController,
  findAccountController,
  resetPasswordController,
};
