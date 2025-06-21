import editingTechnicianSchema, {
  editingTechnicianType,
} from "@/schemas/editingTechnician";
import { Technician } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import FormField from "../formField/formField";
import useTechnician from "@/hook/useTechnician/useTechnician";

type EditTechnicianFormProps = {
  technician: Technician;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTechnicianForm = ({
  technician,
  setIsEditing,
}: EditTechnicianFormProps) => {
  const { editTechnicianMutation } = useTechnician();
  const methods = useForm<editingTechnicianType>({
    resolver: zodResolver(editingTechnicianSchema),
  });

  const { handleSubmit, reset } = methods;

  const handleEditTechnician = (data: editingTechnicianType) => {
    editTechnicianMutation.mutate(data);
    setIsEditing(false);
  };

  useEffect(() => {
    if (technician) {
      reset({
        name: technician.name,
        phone: technician.phone,
      });
    }
  }, [technician, reset]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <FormField formName="name" label="Nome:" />
        <FormField formName="phone" label="Telefone:" />
      </div>
      <ButtonPrimary onClick={handleSubmit(handleEditTechnician)}>
        Salvar
      </ButtonPrimary>
    </FormProvider>
  );
};

export default EditTechnicianForm;
