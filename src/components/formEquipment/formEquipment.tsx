import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import equipmentSchema, { EquipmentType } from "@/schemas/equipment";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import InputSelect from "../clientSelect/clientSelect";
import useClient from "@/hook/useClient";
import { useEffect, useState } from "react";
import { Client } from "@/types";

import DrawerClient from "../drawerClient/drawerClient";
import useEquipment from "@/hook/useEquipment";

const FormEquipment = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const [clientID, setClientID] = useState<number>(0);

  const { registerEquipment } = useEquipment();

  const methods = useForm<EquipmentType>({
    resolver: zodResolver(equipmentSchema),
  });

  const { getAllClients } = useClient();

  useEffect(() => {
    const getClients = async () => {
      const data = await getAllClients();
      setClients(data as Client[]);
    };

    getClients();
  }, []);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateEquipment = (data: EquipmentType) => {
    registerEquipment(data, clientID);
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
          formName="serialNumber"
          placeholder="Numero de Serie"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.serialNumber && (
          <p className="text-red-500 text-sm">{errors.serialNumber.message}</p>
        )}
        <Input
          formName="model"
          placeholder="Modelo"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.model && (
          <p className="text-red-500 text-sm">{errors.model.message}</p>
        )}
      </FormProvider>
      {!clients ? (
        <DrawerClient />
      ) : (
        <InputSelect
          placeholder="Selecione Cliente"
          clients={clients}
          setClientID={setClientID}
        />
      )}

      <div className="flex justify-center">
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
