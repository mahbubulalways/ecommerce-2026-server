import { z } from "zod";

export const LOGIN_VALIDATION = z.object({
  auth: z.string({ error: "Email or phone number is required." }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const EMAIL_VERIFY_VALIDATION = z.object({
  email: z.string({ error: "Email is required." }),
  code: z.string(),
});

export const RESEND_CODE_VALIDATION = z.object({
  email: z.string({ error: "Email is required." }),
});

export const FIND_ACCOUNT_VALIDATION = z.object({
  auth: z.string({ error: "Email or Phone number is required." }),
});

export const PASSWORD_RESET_VALIDATION = z.object({
  token: z.string({ error: "Token is required." }),
  password: z.string({ error: "Password is required." }),
});
