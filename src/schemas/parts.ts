import { z } from "zod";

export type PartType = z.infer<typeof partSchema>;

const partSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, "Descrição obrigatório"),
  name: z.string().min(1, "Nome obrigatório"),
  price: z.number().min(1, "Preço obrigatório"),
  quantity: z.number(),
});

export default partSchema;
