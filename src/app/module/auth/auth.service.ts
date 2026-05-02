import { StatusCodes } from "http-status-codes";
import { Config } from "../../../config";
import { Prisma } from "../../../generated/prisma/client";
import { bcryptHelper } from "../../../helper/bcryptHelper";
import { jwtHelper } from "../../../helper/jwtHelper";
import { prisma } from "../../../lib/prisma";
import { ApplicationError } from "../../errors/ApplicationError";
import { IAuth } from "./auth.interface";
import { getVerificationEmailTemplate } from "../../../html/getVerificationEmailTemplate ";
import { generate6DigitCode } from "../../../helper/generate6DigitCode";
import { nodemailerEmailSender } from "../../../utils/nodemailer";
import { getPasswordResetEmailTemplate } from "../../../html/passwordResetTemplete";

export const userLoginService = async (payload: IAuth) => {
  let auth = "email";
  if (payload.auth.includes("@")) {
    auth = "email";
  } else {
    auth = "phoneNumber";
  }
  const user = await prisma.user.findFirst({
    where: { [auth]: payload.auth, status: "ACTIVE" },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcryptHelper.comparePassword(
    payload.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  await prisma.user.updateManyAndReturn({
    data: {
      lastLogin: new Date(),
    },
    where: {
      [auth]: payload.auth,
    },
  });

  const tokenInfo = {
    email: user.email,
    userId: user.id,
    role: user.role,
    isActive: user.status,
  };

  const accessToken = jwtHelper.generateToken(
    tokenInfo,
    Config.ACCESS_TOKEN_SECRET as string,
    "20D",
  );
  const refreshToken = jwtHelper.generateToken(
    tokenInfo,
    Config.REFRESH_TOKEN_SECRET as string,
    "20D",
  );
  return {
    accessToken,
    refreshToken,
  };
};

//& VERIFY EMAIL
const emailVerificationService = async (payload: {
  email: string;
  code: string;
}) => {
  try {
    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const user = await tx.user.findFirst({
          where: { email: payload.email },
        });

        if (user?.emailCode !== payload.code) {
          throw new ApplicationError(
            StatusCodes.BAD_REQUEST,
            "The verification code you entered is incorrect.",
          );
        }

        if (user?.emailExpiry! < new Date()) {
          throw new ApplicationError(
            StatusCodes.BAD_REQUEST,
            "This verification code has expired. Please request a new one.",
          );
        }

        const result = await tx.user.update({
          data: {
            isVerified: true,
            emailCode: null,
            emailExpiry: null,
            status: "ACTIVE",
          },
          where: {
            email: user.email,
          },
        });
        return result;
      },
    );
    return result;
  } catch (error: any) {
    throw new ApplicationError(StatusCodes.BAD_REQUEST, error.message);
  }
};

//& REQUEST FOR NEW CODE
const newEmailVerificationCodeGenerateService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user?.email) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        "User with this email not found",
      );
    }

    const verificationInfo = generate6DigitCode();
    await prisma.user.update({
      data: {
        emailCode: verificationInfo,
        emailExpiry: new Date(Date.now() + 2 * 60 * 1000),
      },
      where: {
        email,
      },
    });

    const verificationHTML = getVerificationEmailTemplate(verificationInfo);
    const mailInfo = {
      receiver: user.email,
      subject: "Taskdin Email Verification",
      html: verificationHTML,
    };
    await nodemailerEmailSender.sendMail(mailInfo);
    return {
      email: user.email,
    };
  } catch (error: any) {
    throw new ApplicationError(StatusCodes.BAD_REQUEST, error.message);
  }
};

// & FIND ACCOUNT FOR FORGOT PASSWORD
const findAccountService = async (payload: { auth: string }) => {
  let auth = "email";
  if (payload.auth.includes("@")) {
    auth = "email";
  } else {
    auth = "phoneNumber";
  }

  const user = await prisma.user.findFirst({
    where: { [auth]: payload.auth, status: "ACTIVE" },
  });

  if (!user?.id) {
    throw new ApplicationError(
      StatusCodes.NOT_FOUND,
      "User with this credential not found.",
    );
  }

  const tokenInfo = {
    email: user.email,
  };

  const resetToken = jwtHelper.generateToken(
    tokenInfo,
    Config.PASSWORD_RESET_TOKEN_SECRET as string,
    "10M",
  );

  const resetLink = `http://localhost:3000/auth/reset-password?prt=${resetToken}`;
  const mailPayload = {
    html: getPasswordResetEmailTemplate(resetLink),
    subject: "Password Reset Request",
    receiver: user?.email,
  };
  const sendMial = await nodemailerEmailSender.sendMail(mailPayload);
  if (sendMial.accepted.length) {
    return true;
  } else {
    false;
  }
};

// & FIND ACCOUNT FOR FORGOT PASSWORD
const resetPasswordService = async (payload: {
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log(payload);
  const decode = await jwtHelper.verifyToken(
    payload.token,
    Config.PASSWORD_RESET_TOKEN_SECRET as string,
  );
  if (!decode) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "The password reset link is expired",
    );
  }
  if (payload.confirmPassword != payload.password) {
    throw new ApplicationError(StatusCodes.BAD_REQUEST, "Password not match");
  }

  const hashPasssword = await bcryptHelper.hashPassword(payload.password);
  const result = await prisma.user.update({
    data: { password: hashPasssword },
    where: { email: decode.email },
  });
  return result;
};

export const AuthService = {
  userLoginService,
  emailVerificationService,
  newEmailVerificationCodeGenerateService,
  findAccountService,
  resetPasswordService,
};
