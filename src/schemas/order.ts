import { z } from "zod";
import servicesSchema from "./services";

export type OrderType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  status: z.string(),
  comment: z.string(),
  clientId: z.string(),
  services: z.array(servicesSchema),
});

export default orderSchema;
