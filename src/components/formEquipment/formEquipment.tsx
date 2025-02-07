import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import equipmentSchema, { EquipmentType } from "@/schemas/equipment";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import useRegister from "@/hook/useRegister";

const FormEquipment = () => {
  const { registerEquipment } = useRegister();

  const methods = useForm<EquipmentType>({
    resolver: zodResolver(equipmentSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateEquipment = (data: EquipmentType) => {
    registerEquipment(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Input formName="name" placeholder="Nome" className="" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <Input formName="description" placeholder="Descrição" className="" />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <Input
          formName="serialNumber"
          placeholder="Numero de Serie"
          className=""
        />
        {errors.serialNumber && (
          <p className="text-red-500 text-sm">{errors.serialNumber.message}</p>
        )}
        <Input formName="equipmentModel" placeholder="Modelo" className="" />
        {errors.equipmentModel && (
          <p className="text-red-500 text-sm">
            {errors.equipmentModel.message}
          </p>
        )}
      </FormProvider>
      <div className="flex justify-center ">
        <ButtonPrimary
          onClick={handleSubmit(handleCreateEquipment)}
          className="font-semibold text-2xl py-4 px-40 mt-16 mb-11"
        >
          Criar
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default FormEquipment;
