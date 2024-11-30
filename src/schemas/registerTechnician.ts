import { z } from "zod";

export type registerTechnicianType = z.infer<typeof technicianSchema>;

const phoneRegex = RegExp(
  "(?:(^\\+\\d{2})?)(?:([1-9]{2})|(\\d{3})?)(\\d{4,5}).?(\\d{4})"
);

const technicianSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
  name: z.string().min(1, "O nome é obrigatorio!"),
  phone: z.string().regex(phoneRegex, "Número de telefone inválido"),
});

export default technicianSchema;
