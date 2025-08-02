import { BASE_URL } from "@/constants";
import { notifyPositionMap, notifyType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useNotify from "../useNotify";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import { EquipmentType } from "@/schemas/equipment";

type UseEquipmentProps = {
  equipmentId?: number;
};

const useEditEquipment = ({ equipmentId }: UseEquipmentProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const queryClient = useQueryClient();

  const notify = useNotify();

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const urlEditEquipment = `${BASE_URL}/equipment/${equipmentId}`;

  const editEquipmentMutation = useMutation({
    mutationFn: (formData: EquipmentType) => {

      return axios.put(urlEditEquipment, formData, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllEquipments"] });
      notify(
        "Peça Editado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    },
    onError: (error) => {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    },
  });
  return { editEquipmentMutation };
};

export default useEditEquipment;
