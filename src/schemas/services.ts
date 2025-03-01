import { z } from "zod";

export type ServicesType = z.infer<typeof servicesSchema>;

const servicesSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
  price: z.string().min(1, "Preço é obrigatório"),
  time: z.string().min(1, "Tempo estimado é obrigatório"),
});

export default servicesSchema;
