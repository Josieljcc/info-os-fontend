import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Input from "@/components/input/input";
import Spinner from "@/components/spinner/spinner";
import useClient from "@/hook/useClient";
import editingClientSchema, { editingClientType } from "@/schemas/editing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";

const DetailClient = () => {
  const { id } = useParams();
  const { getClientById, editClientMutation } = useClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  

  const methods = useForm<editingClientType>({
    resolver: zodResolver(editingClientSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const { data: client, isFetching } = useQuery({
    queryKey: ["getClient"],
    queryFn: () => getClientById(id as string),
  });

  const handleEditClient = (data: editingClientType) => {
    editClientMutation.mutate(data);
    setIsEditing(!isEditing);
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

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-main-bg bg-cover overflow-hidden bg-center flex justify-center pt-24 px-8 pb-5 items-center text-white shadow-md">
      <div className=" h-[55%] md:w-1/2 max-w-[34.5rem] rounded-lg bg-[#3F3F46] flex flex-col p-10 justify-between">
        <div className="flex items-center gap-4">
          <RxAvatar className="h-16 w-16" />
          <div>
            <h1 className="font-medium text-lg">{client?.name}</h1>
            <p className="text-white/85 text-sm">{client?.email}</p>
          </div>
        </div>
        {isEditing ? (
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
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <ButtonPrimary onClick={handleSubmit(handleEditClient)}>
              Salvar
            </ButtonPrimary>
          </FormProvider>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex justify-between pb-4 border-b-[.1875rem] border-gray-500/45">
                <h2 className="">Nome:</h2>
                <p className="text-sm font ">{client?.name}</p>
              </div>
              <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
                <h2 className="">Email:</h2>
                <p className="text-sm ">{client?.email}</p>
              </div>
              <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
                <h2 className="">Endereço:</h2>
                <p className="text-sm ">{client?.address}</p>
              </div>
              <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
                <h2 className="">Telefone:</h2>
                <p className="text-sm ">{client?.phone}</p>
              </div>
            </div>
            <ButtonPrimary onClick={() => setIsEditing(!isEditing)}>
              Editar
            </ButtonPrimary>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailClient;
