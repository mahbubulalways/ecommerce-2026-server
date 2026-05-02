import z from "zod";

export const SPECIFICATION_KEY_VALIDATION = z.object({
  name: z.string({ error: "Specification key is required." }),
  unit: z.string().optional(),
});
