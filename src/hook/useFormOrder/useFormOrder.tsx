import UserContext from "@/context/userContext";
import { OrderType } from "@/schemas/order";
import { format } from "date-fns";
import { useContext } from "react";
import useOrder from "../useOrderService/useOrder";

const useFormOrder = () => {
  const { registerOrder } = useOrder();

  const { user } = useContext(UserContext);

  const handleCreateOrder = (data: OrderType) => {
    const payLoad: OrderType = {
      ...data,
      technicianId: user.id,
      forecastDate: format(
        new Date(data.forecastDate),
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      ),
      openingDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };
    registerOrder(payLoad);
  };

  return {
    handleCreateOrder,
  };
};

export default useFormOrder;
