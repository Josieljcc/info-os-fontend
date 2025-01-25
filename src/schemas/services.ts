import { z } from "zod";

export type ServicesType = z.infer<typeof servicesSchema>;

const servicesSchema = z.object({
  description: z.string(),
  price: z.string().min(1, "Preço é obrigatório"),
  time: z.string().min(1, "Tempo estimado é obrigatório"),
});

export default servicesSchema;
