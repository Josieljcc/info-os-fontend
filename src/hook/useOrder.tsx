import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType, Part, Service } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "./useNotify";

export type OrderPayload = {
  date: string;
  status: string;
  comment: string;
  clientId: string;
  technicianId: string;
  services: Service[];
  parts: Part[];
};

const useOrder = () => {
  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const notify = useNotify();

  const registerOrder = async (payload: OrderPayload) => {
    const urlRegisterOrder = `${BASE_URL}/order`;
    try {
      await axios.post(urlRegisterOrder, payload, header);
      notify(
        "Ordem de Serviço Registrada com Sucesso!",
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

  return {registerOrder};
};

export default useOrder;
