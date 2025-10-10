import { z } from "zod";
import servicesSchema from "./services";
import partSchema from "./parts";

export type OrderType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  // Campos usados para criação simples pelo formulário
  date: z.string().min(1, "Data é obrigatória"),
  status: z.string(),
  comment: z.string(),
  clientId: z.string(),
  services: z.array(servicesSchema).optional().default([]),
  parts: z.array(partSchema).optional().default([]),
  // Campos usados no fluxo de edição e detalhamento
  openingDate: z.string().optional(),
  forecastDate: z.string().optional(),
  closingDate: z.string().nullable().optional(),
});

export default orderSchema;
