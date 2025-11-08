import { z } from "zod";
import servicesSchema from "./services";
import partSchema from "./parts";
import clientSchema from "./registerClient";
import { orderStatus } from "@/types";

export type OrderType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  forecastDate: z.string().date(),
  closingDate: z.string().date(),
  comment: z.string(),
  clientId: z.number(),
  status: z.enum(orderStatus).optional(),
  client: clientSchema,
  services: z.array(servicesSchema).optional(),
  parts: z.array(partSchema).optional(),
  technicianId: z.number().optional(),
  openingDate: z.string().date().optional(),
});

export default orderSchema;
