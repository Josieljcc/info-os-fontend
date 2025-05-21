import clientSchema, { registerClientType } from "@/schemas/registerClient";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import Input from "../input/input";
import useClient from "@/hook/useClient/useClient";

const FormClient = () => {
  const { registerClient } = useClient();

  const methods = useForm<registerClientType>({
    resolver: zodResolver(clientSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateClient = (data: registerClientType) => {
    registerClient(data);
  };

  return (
    <div className="h-full flex flex-col gap-4 font-medium  w-3/4 md:w-1/2">
      <FormProvider {...methods}>
        <Input
          formName="name"
          placeholder="Nome"
          className="py-6 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <Input
          formName="email"
          placeholder="Email"
          className="py-6 text-[#D4D4D8] text-xl placeholder-[#D4D4D8]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <Input
          formName="password"
          placeholder="Senha"
          type="password"
          className="py-6 text-[#D4D4D8] text-xl placeholder-[#D4D4D8]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <Input
          formName="phone"
          placeholder="Telefone"
          className="py-6 text-[#D4D4D8] text-xl placeholder-[#D4D4D8]"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
        <Input
          formName="address"
          placeholder="Endereço"
          className="py-6 text-[#D4D4D8] text-xl placeholder-[#D4D4D8]"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
        <div className="flex justify-center ">
          <ButtonPrimary
            onClick={handleSubmit(handleCreateClient)}
            className="font-semibold text-2xl py-4 px-40 mt-10 mb-11"
          >
            Criar
          </ButtonPrimary>
        </div>
      </FormProvider>
    </div>
  );
};

export default FormClient;
