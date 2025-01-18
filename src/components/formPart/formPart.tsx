import partSchema, { PartType } from "@/schemas/parts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import useRegister from "@/hook/useRegister";
import { useContext } from "react";
import UserContext from "@/context/userContext";

const FormPart = () => {
  const { registerPart } = useRegister();

  const {
    user: { token },
  } = useContext(UserContext);

  const methods = useForm<PartType>({
    resolver: zodResolver(partSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreatePart = (data: PartType) => {
    registerPart(data, token);
  };

  return (
    <div className="h-full flex flex-col gap-4 font-medium  w-3/4 md:w-1/2">
      <FormProvider {...methods}>
        <Input
          formName="name"
          placeholder="Nome"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
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
          type="number"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
        <Input
          formName="quantity"
          placeholder="Quantidade"
          type="number"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
        <div className="flex justify-center">
          <ButtonPrimary
            onClick={handleSubmit(handleCreatePart)}
            className="font-semibold text-2xl py-4 px-40 mt-16 mb-11 "
          >
            Criar
          </ButtonPrimary>
        </div>
      </FormProvider>
    </div>
  );
};

export default FormPart;
