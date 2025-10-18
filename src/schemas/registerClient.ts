import { z } from "zod";

export type registerClientType = z.infer<typeof clientSchema>;

const phoneRegex = RegExp(
  "(?:(^\\+\\d{2})?)(?:([1-9]{2})|(\\d{3})?)(\\d{4,5}).?(\\d{4})"
);

const clientSchema = z.object({
  id: z.number().optional(),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres.")
    .optional(),
  name: z.string().min(1, "O nome é obrigatório!"),
  phone: z
    .string()
    .max(12, "Número de telefone inválido")
    .regex(phoneRegex, "Número de telefone inválido"),
  address: z.string(),
});

export default clientSchema;
