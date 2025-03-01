import orderSchema, { OrderType } from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import UseService from "@/hook/useService";
import { useContext, useEffect, useState } from "react";
import { Client, Part, Service } from "@/types";
import InputSelect, { SelectType } from "../inputSelect/inputSelect";
import usePart from "@/hook/usePart";
import useClient from "@/hook/useClient";
import UserContext from "@/context/userContext";
import useOrder, { OrderPayload } from "@/hook/useOrder";

const FormOrder = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [selectedPartId, setSelectedPartId] = useState<number>();
  const [clientId, setClientId] = useState<number>();

  const methods = useForm<OrderType>({ resolver: zodResolver(orderSchema) });

  const { getAllServices } = UseService();

  const { getAllPart } = usePart();

  const { getAllClients } = useClient();

  const { registerOrder } = useOrder();

  const {
    user: { id: technicianId },
  } = useContext(UserContext);

  useEffect(() => {
    const getServices = async () => {
      const data = await getAllServices();
      setServices(data as Service[]);
    };
    getServices();
  }, []);

  useEffect(() => {
    const getParts = async () => {
      const data = await getAllPart();
      setParts(data as Part[]);
    };
    getParts();
  }, []);

  useEffect(() => {
    const getClients = async () => {
      const data = await getAllClients();
      setClients(data as Client[]);
    };
    getClients();
  }, []);

  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const handleCreateOrder = (data: OrderType) => {
    const selectedService = services?.find(
      (service) => service.id === selectedServiceId
    );
    const selectedPart = parts?.find((part) => part.id === selectedPartId);
    const payLoad: OrderPayload = {
      ...data,
      services: [selectedService as Service],
      parts: [selectedPart as Part],
      technicianId: String(technicianId),
      clientId: String(clientId),
    };
    registerOrder(payLoad);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Input
          formName="date"
          placeholder="Nome"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
        <Input
          formName="status"
          placeholder="Status"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
        <Input
          formName="comment"
          placeholder="Comentário"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </FormProvider>
      <InputSelect
        list={services as SelectType[]}
        placeholder="Serviços"
        setValue={setSelectedServiceId}
      />
      <InputSelect
        list={parts as SelectType[]}
        setValue={setSelectedPartId}
        placeholder="Peças"
      />
      <InputSelect
        list={clients}
        setValue={setClientId}
        placeholder="Cliente"
      />

      <ButtonPrimary onClick={handleSubmit(handleCreateOrder)}>
        Criar
      </ButtonPrimary>
    </div>
  );
};

export default FormOrder;
