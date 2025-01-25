import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import servicesSchema, { ServicesType } from "@/schemas/services";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import useRegister from "@/hook/useRegister";

const FormService = () => {
  const { registerService } = useRegister();

  const methods = useForm<ServicesType>({
    resolver: zodResolver(servicesSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateServices = (data: ServicesType) => {
    registerService(data);
  };

  return (
    <div className="h-full flex flex-col gap-4 font-medium  w-3/4 md:w-1/2">
      <FormProvider {...methods}>
        <Input
          formName="description"
          placeholder="Descrição"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <Input
          formName="price"
          placeholder="Preço"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
        <Input
          formName="time"
          placeholder="Tempo estimado"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.time && (
          <p className="text-red-500 text-sm">{errors.time.message}</p>
        )}
        <div className="flex justify-center">
          <ButtonPrimary
            onClick={handleSubmit(handleCreateServices)}
            className="font-semibold text-2xl py-4 px-40 mt-16 mb-11"
          >
            Criar
          </ButtonPrimary>
        </div>
      </FormProvider>
    </div>
  );
};

export default FormService;
