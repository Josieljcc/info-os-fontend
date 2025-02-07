import { z } from "zod";

export type EquipmentType = z.infer<typeof equipmentSchema>

const equipmentSchema = z.object({
  name: z.string().min(1, "Nome do equipamento é obrigatório"),
  description: z.string(),
  serialNumber: z.string(),
  equipmentModel: z.string(),
});

export default equipmentSchema