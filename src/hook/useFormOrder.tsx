import UserContext from "@/context/userContext";
import { Part } from "@/types";
import { useState, useContext, useEffect } from "react";
import useOrder, { OrderPayload } from "./useOrder";
import usePart from "./usePart";
import { OrderType } from "@/schemas/order";

const useFormOrder = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<number>();

  const { getAllPart } = usePart();

  const { registerOrder } = useOrder();

  const {
    user: { id: technicianId },
  } = useContext(UserContext);

  useEffect(() => {
    const getParts = async () => {
      const data = await getAllPart();
      setParts(data as Part[]);
    };
    getParts();
  }, []);

  const handleCreateOrder = (data: OrderType) => {

    const selectedPart = parts?.find((part) => part.id === selectedPartId);
    const payLoad: OrderPayload = {
      ...data,
      services: [],
      parts: [selectedPart as Part],
      technicianId: String(technicianId),
    };
    registerOrder(payLoad);
  };

  return {
    parts,
    handleCreateOrder,
    setSelectedPartId,
  };
};

export default useFormOrder;
