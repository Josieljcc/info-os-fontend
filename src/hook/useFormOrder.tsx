import UserContext from "@/context/userContext";
import { Service, Part, Order } from "@/types";
import { useState, useContext, useEffect } from "react";
import useOrder from "./useOrder";
import usePart from "./usePart";
import UseService from "./useService";
import { OrderType } from "@/schemas/order";
import useClient from "./useClient/useClient";

const useFormOrder = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [selectedPartId, setSelectedPartId] = useState<number>();
  const [clientId, setClientId] = useState<number>();

  const {clients} = useClient()

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
      clientId: String(clientId),
    };
    registerOrder(payLoad);
  };

  return {
    clients,
    parts,
    services,
    handleCreateOrder,
    setClientId,
    setSelectedServiceId,
    setSelectedPartId,
  };
};

export default useFormOrder;
