import { z } from "zod";

export type editingTechnicianType = z.infer<typeof editingTechnicianSchema>;

const phoneRegex = RegExp(
  "(?:(^\\+\\d{2})?)(?:([1-9]{2})|(\\d{3})?)(\\d{4,5}).?(\\d{4})"
);

const editingTechnicianSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório!"),
  phone: z
    .string()
    .max(12, "Número de telefone inválido")
    .regex(phoneRegex, "Número de telefone inválido"),
});

export default editingTechnicianSchema;
