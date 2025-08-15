import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

const useDeleteService = () => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const deleteService = async (serviceId: number) => {
    try {
      await axios.delete(`${BASE_URL}/service/${serviceId}`, header);
      queryClient.invalidateQueries({ queryKey: ["getAllService"] });
      queryClient.invalidateQueries({ queryKey: ["getserviceBySearch"] });
      notify(
        "Serviço excluído com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    }
  };

  return { deleteService };
};

export default useDeleteService;
