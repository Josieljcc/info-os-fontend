import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import useNotify from "../useNotify";
import { notifyPositionMap, notifyType, OrderResponse } from "@/types";
import { OrderType } from "@/schemas/order";

const useEditOrderService = ({ orderId }: { orderId: number }) => {
  const {
    user: { token },
  } = useContext(UserContext);
  const queryClient = useQueryClient();
  const notify = useNotify();
  const editOrderService = async (data: OrderType) => {
    const url = `${BASE_URL}/order/${orderId}`;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put<OrderResponse>(url, data, header);
    return response.data;
  };
  const editOrderMutation = useMutation({
    mutationFn: editOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllOrder"] });
      notify(
        "Ordem de Serviço atualizada com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    },
    onError: (error) => {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    },
  });
  return { editOrderMutation };
};
export default useEditOrderService;
