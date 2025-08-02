
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import FormField from "../formField/formField";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import equipmentSchema, { EquipmentType } from "@/schemas/equipment";
import useEditEquipment from "@/hook/useEquipment/useEditEquipment";
import { Equipment } from "@/types";

type EditEquipmentFormProps = {
  equipment: Equipment;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditEquipmentForm = ({ equipment, setIsEditing }: EditEquipmentFormProps) => {
  const { editEquipmentMutation } = useEditEquipment({ equipmentId: equipment?.id });
  const methods = useForm<EquipmentType>({
    resolver: zodResolver(equipmentSchema),
  });

  const { handleSubmit, reset } = methods;

  const handleEditEquipment = (data: EquipmentType) => {
    editEquipmentMutation.mutate(data);
    setIsEditing(false);
  };

  useEffect(() => {
    if (equipment) {
      reset({
        name: equipment.name,
        model: equipment.model,
        serialNumber: equipment.serialNumber,
        description: equipment.description,
      });
    }
  }, [equipment, reset]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <FormField formName="name" label="Nome:" />
        <FormField formName="model" label="Quantidade:" />
        <FormField formName="serialNumber" label="Preço:" />
        <FormField formName="description" label="Descrição" />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <ButtonPrimary onClick={handleSubmit(handleEditEquipment)}>
          Salvar
        </ButtonPrimary>
        <AlertDialogCancel
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
          disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background 
          hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0"
        >
          Cancelar
        </AlertDialogCancel>
      </div>
    </FormProvider>
  );
};

export default EditEquipmentForm;
