import { z } from "zod";

export type OrderType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  status: z.string(),
  comment: z.string(),
});

export default orderSchema;
