import UserContext from "@/context/userContext";
import { Part } from "@/types";
import { useState, useContext } from "react";
import useOrder, { OrderPayload } from "../useOrder";
import usePart from "../usePart";
import { OrderType } from "@/schemas/order";

const useFormOrder = () => {
  const [selectedPartId, setSelectedPartId] = useState<number>();

  const { parts } = usePart();

  const { registerOrder } = useOrder();

  const {
    user: { id: technicianId },
  } = useContext(UserContext);

  const handleCreateOrder = (data: OrderType) => {
    const selectedPart = parts?.find((part) => part?.id === selectedPartId);
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
