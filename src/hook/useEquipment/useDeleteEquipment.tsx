import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const deleteEquipment = async (equipmentId: number) => {
    try {
      await axios.delete(`${BASE_URL}/equipment/${equipmentId}`, header);
      queryClient.invalidateQueries({ queryKey: ["getAllEquipments"] });
      queryClient.invalidateQueries({ queryKey: ["getequipmentBySearch"] });
      notify(
        "Equipamento excluído com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    }
  };

  return { deleteEquipment };
};

export default useDeleteEquipment;
