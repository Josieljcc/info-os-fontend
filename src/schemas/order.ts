import { z } from "zod";
import servicesSchema from "./services";
import partSchema from "./parts";

export type OrderType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  status: z.string(),
  comment: z.string(),
  clientId: z.string(),
  services: z.array(servicesSchema),
  parts: z.array(partSchema),
});

export default orderSchema;
