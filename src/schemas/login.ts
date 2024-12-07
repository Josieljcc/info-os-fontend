import { z } from "zod";

export type loginType = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
});

export default loginSchema;
