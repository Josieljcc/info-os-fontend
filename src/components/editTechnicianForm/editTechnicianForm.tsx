import useTechnician from "@/hook/useTechnician";
import { Technician } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import Input from "../input/input";
import editingTechnicianSchema, {
  editingTechnicianType,
} from "@/schemas/editingTechnician";

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

  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

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
        <div className="flex flex-col gap-2">
          <h2>Nome:</h2>
          <Input formName="name" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Telefone:</h2>
          <Input formName="phone" />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <ButtonPrimary onClick={handleSubmit(handleEditTechnician)}>
        Salvar
      </ButtonPrimary>
    </FormProvider>
  );
};

export default EditTechnicianForm;
