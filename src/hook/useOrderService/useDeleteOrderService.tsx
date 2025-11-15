import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import useNotify from "../useNotify";
import { notifyPositionMap, notifyType } from "@/types";

const useDeleteOrderService = () => {
  const {
    user: { token },
  } = useContext(UserContext);
  const queryClient = useQueryClient();
  const notify = useNotify();
  const deleteOrderService = async (id: number) => {
    const url = `${BASE_URL}/order/${id}`;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(url, header);
  };
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllOrder"] });
      notify(
        "Ordem de Serviço deletada com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    },
    onError: (error) => {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    },
  });
  return {
    deleteOrderService: deleteOrderMutation.mutateAsync,
    ...deleteOrderMutation,
  };
};
export default useDeleteOrderService;
