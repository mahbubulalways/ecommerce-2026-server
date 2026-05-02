import { StatusCodes } from "http-status-codes";
import { Prisma, USER_ROLE } from "../../../generated/prisma/client";
import { ApplicationError } from "../../errors/ApplicationError";
import type { IAdmin } from "../admin/admin.interface";
import { isUserExist } from "./user.utils";
import { bcryptHelper } from "../../../helper/bcryptHelper";
import { generate6DigitCode } from "../../../helper/generate6DigitCode";
import { prisma } from "../../../lib/prisma";
import { nodemailerEmailSender } from "../../../utils/nodemailer";
import { getVerificationEmailTemplate } from "../../../html/getVerificationEmailTemplate ";

// CREATE ADMIN INTO DB
const createAdminService = async (payload: IAdmin) => {
  const isExist = await isUserExist(payload.email, payload.phoneNumber);
  if (isExist) {
    throw new ApplicationError(
      StatusCodes.CONFLICT,
      "User with this email or phone number already exists.",
    );
  }
  const hashPassword = await bcryptHelper.hashPassword(payload.password);
  const emailCode = generate6DigitCode();
  const user = {
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    password: hashPassword,
    emailCode: emailCode,
    emailExpiry: new Date(Date.now() + 2 * 60 * 1000),
    role: USER_ROLE.SUPER_ADMIN,
  };
  const admin = {
    name: payload.name,
    adminRole: payload.adminRole,
    createdAt: new Date(),
    userId: "",
  };
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const newUser = await tx.user.create({ data: user });

      admin.userId = newUser.id;
      await tx.admin.create({ data: admin });
      return newUser;
    },
  );

  if (result.id) {
    const emailInfo = {
      receiver: result.email,
      subject: "Email verification code from Buyoro",
      html: getVerificationEmailTemplate(emailCode),
    };
    await nodemailerEmailSender.sendMail(emailInfo);
  }

  return result;
};

export const UserService = { createAdminService };
