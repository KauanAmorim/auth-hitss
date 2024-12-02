import z from "zod";

export const UserDecryptJWEValidator = z.object({
  jwe: z.string().min(50)
});
