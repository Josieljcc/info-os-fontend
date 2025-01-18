import { z } from "zod";

export type PartType = z.infer<typeof partSchema>;

const partSchema = z.object({
  description: z.string().min(1, "Descrição obrigatório"),
  name: z.string().min(1, "Nome obrigatório"),
  price: z.string().min(1, "Preço obrigatório"),
  quantity: z.string(),
});

export default partSchema;
