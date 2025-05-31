import { z } from "zod";

export type ServicesType = z.infer<typeof servicesSchema>;

const servicesSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
  price: z.coerce.number().min(1, "Preço é obrigatório"),
  time: z.coerce.number(),
});

export default servicesSchema;
