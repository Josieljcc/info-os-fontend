import clientSchema, { registerClientType } from "@/schemas/registerClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import useClient from "@/hook/useClient/useClient";
import InputList from "../imputList/imputList";

const FormClient = () => {
  const { registerClient } = useClient({});

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

  const inputs = [
    { name: "name", placeholder: "Nome" },
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Senha", type: "password" },
    { name: "phone", placeholder: "Telefone" },
    { name: "address", placeholder: "Endereço" },
  ];

  return (
    <div className="h-full flex flex-col gap-4 font-medium w-3/4 md:w-1/2">
      <FormProvider {...methods}>
        <InputList
          inputs={inputs}
          errors={errors}
          inputClassName="py-6 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        <div className="flex justify-center">
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