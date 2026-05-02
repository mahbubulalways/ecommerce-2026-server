import { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import VALIDATE_REQUEST from "../../middleware/validateRequest";
import {
  EMAIL_VERIFY_VALIDATION,
  FIND_ACCOUNT_VALIDATION,
  LOGIN_VALIDATION,
  PASSWORD_RESET_VALIDATION,
  RESEND_CODE_VALIDATION,
} from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();
router.post(
  ENDPOINTS.AUTH.LOGIN,
  VALIDATE_REQUEST(LOGIN_VALIDATION),
  AuthController.loginUserController,
);

router.post(
  ENDPOINTS.AUTH.VERIFY,
  VALIDATE_REQUEST(EMAIL_VERIFY_VALIDATION),
  AuthController.emailVerificationController,
);

router.post(
  ENDPOINTS.AUTH.RESEND_CODE,
  VALIDATE_REQUEST(RESEND_CODE_VALIDATION),
  AuthController.newEmailVerificationCodeGenerateController,
);

router.post(
  ENDPOINTS.AUTH.FIND_ACCOUNT,
  VALIDATE_REQUEST(FIND_ACCOUNT_VALIDATION),
  AuthController.findAccountController,
);

router.post(
  ENDPOINTS.AUTH.PASSWORD_RESET,
  VALIDATE_REQUEST(PASSWORD_RESET_VALIDATION),
  AuthController.resetPasswordController,
);

export default router;
