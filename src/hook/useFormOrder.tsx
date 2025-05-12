import UserContext from "@/context/userContext";
import { Service, Part, Client } from "@/types";
import { useState, useContext, useEffect } from "react";
import useClient from "./useClient/useClient";
import useOrder, { OrderPayload } from "./useOrder";
import usePart from "./usePart";
import UseService from "./useService";
import { OrderType } from "@/schemas/order";
import useClient from "./useClient/useClient";

const useFormOrder = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [selectedPartId, setSelectedPartId] = useState<number>();
  const [clientId, setClientId] = useState<number>();

  const { getAllServices } = UseService();

  const { getAllPart } = usePart();

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
      console.log(clients);
    };
    getClients();
  }, []);

  const handleCreateOrder = (data: OrderType) => {
    const selectedService = services?.find(
      (service) => service.id === selectedServiceId
    );
    const selectedPart = parts?.find((part) => part.id === selectedPartId);
    const payLoad: Order = {
      ...data,
      services: [selectedService as Service],
      parts: [selectedPart as Part],
      technicianId: String(technicianId),
    };
    registerOrder(payLoad);
  };

  return {
    parts,
    services,
    handleCreateOrder,
    setSelectedServiceId,
    setSelectedPartId,
  };
};

export default useFormOrder;
