import { z } from "zod";

export type registerTechnicianType = z.infer<typeof technicianSchema>;

const phoneRegex = RegExp(
  "(?:(^\\+\\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\\d{4,5}).?(\\d{4})"
);

const technicianSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6),
  name: z.string(),
  phone: z.string().regex(phoneRegex, "Número de telefone inválido"),
});

export default technicianSchema;
