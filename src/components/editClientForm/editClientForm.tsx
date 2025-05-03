import useClient from "@/hook/useClient/useClient";
import editingClientSchema, { editingClientType } from "@/schemas/editing";
import { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import Input from "../input/input";

type EditClientFormProps = {
  client: Client;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditClientForm = ({ client, setIsEditing }: EditClientFormProps) => {
  const { editClientMutation } = useClient();
  const methods = useForm<editingClientType>({
    resolver: zodResolver(editingClientSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const handleEditClient = (data: editingClientType) => {
    editClientMutation.mutate(data);
    setIsEditing(false);
  };

  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
        phone: client.phone,
        address: client.address,
      });
    }
  }, [client, reset]);

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
        <div className="flex flex-col gap-2">
          <h2>Endereço:</h2>
          <Input formName="address" />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
      </div>
      <ButtonPrimary onClick={handleSubmit(handleEditClient)}>
        Salvar
      </ButtonPrimary>
    </FormProvider>
  );
};

export default EditClientForm;
