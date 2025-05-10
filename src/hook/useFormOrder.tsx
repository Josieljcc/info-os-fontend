import UserContext from "@/context/userContext";
import { Service, Part } from "@/types";
import { useState, useContext, useEffect } from "react";
import useOrder, { OrderPayload } from "./useOrder";
import usePart from "./usePart";
import UseService from "./useService";
import { OrderType } from "@/schemas/order";

const useFormOrder = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [selectedPartId, setSelectedPartId] = useState<number>();

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
    const payLoad: OrderPayload = {
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
