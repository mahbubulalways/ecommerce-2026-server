import { z } from "zod";

export const CREATE_ADMIN_VALIDATION = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  adminRole: z.enum(["SUPER_ADMIN", "ADMIN", "STAFF"]),
});
