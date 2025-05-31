import useClient from "@/hook/useClient/useClient";
import editingClientSchema, { editingClientType } from "@/schemas/editing";
import { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import FormField from "../formField/formField";

type EditClientFormProps = {
  client: Client;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditClientForm = ({ client, setIsEditing }: EditClientFormProps) => {
  const { editClientMutation } = useClient();
  const methods = useForm<editingClientType>({
    resolver: zodResolver(editingClientSchema),
  });

  const { handleSubmit, reset } = methods;

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
        <FormField formName="name" label="Nome:" />
        <FormField formName="phone" label="Telefone:" />
        <FormField formName="address" label="Endereço:" />
      </div>
      <ButtonPrimary onClick={handleSubmit(handleEditClient)}>
        Salvar
      </ButtonPrimary>
    </FormProvider>
  );
};

export default EditClientForm;
