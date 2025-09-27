import UserContext from "@/context/userContext";

import { useContext } from "react";
import useOrder from "../useOrder";

import { OrderType } from "@/schemas/order";
import { format } from "date-fns";

const useFormOrder = () => {
  const { registerOrder } = useOrder();

  const { user } = useContext(UserContext);

  const handleCreateOrder = (data: OrderType) => {
    const payLoad: OrderType = {
      ...data,
      technicianId: user.id,
      forecastDate: format(data.forecastDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      openingDate: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };
    registerOrder(payLoad);
  };

  return {
    handleCreateOrder,
  };
};

export default useFormOrder;
