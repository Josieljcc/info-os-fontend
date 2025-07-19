import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { EquipmentType } from "@/schemas/equipment";
import { notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { useQueryClient } from "@tanstack/react-query";

const useEquipment = () => {
  const notify = useNotify();
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerEquipment = async (data: EquipmentType, clientID: number) => {
    const payload = {
      ...data,
      clientID,
    };

    const urlRegisterEquipment = `${BASE_URL}/equipment`;
    try {
      await axios.post(urlRegisterEquipment, payload, header);
      queryClient.invalidateQueries({ queryKey: ["getAllEquipments"] });
      notify(
        "Equipamento Registrado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  return { registerEquipment };
};

export default useEquipment;
