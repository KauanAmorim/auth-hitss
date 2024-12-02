import z from "zod";

export const UserRegisterInputValidator = z.object({
  email: z.string().email().min(10).max(250),
  senha: z.string().min(12).max(100)
});
