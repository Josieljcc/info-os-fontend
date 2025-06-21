import useClient from "@/hook/useClient/useClient";
import editingClientSchema, { editingClientType } from "@/schemas/editing";
import { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import FormField from "../formField/formField";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

type EditClientFormProps = {
  client: Client;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditClientForm = ({ client, setIsEditing }: EditClientFormProps) => {
  const { editClientMutation } = useClient({ clientId: client?.id });
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
      <div className="flex flex-col gap-4 p-4">
        <ButtonPrimary onClick={handleSubmit(handleEditClient)}>
          Salvar
        </ButtonPrimary>
        <AlertDialogCancel className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
          disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background 
          hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0">
          Cancelar
        </AlertDialogCancel>
      </div>

    </FormProvider>
  );
};

export default EditClientForm;
