import { BASE_URL } from "@/constants";
import { ServicesType } from "@/schemas/services";
import { notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import useNotify from "../useNotify";
import { useQueryClient } from "@tanstack/react-query";

const UseService = () => {
  const notify = useNotify();

  const {
    user: { token },
  } = useContext(UserContext);

  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const queryClient = useQueryClient();

  const serviceEndpoint = `${BASE_URL}/service`;

  const registerService = async (data: ServicesType) => {
    const payload = {
      ...data,
      price: Number(data.price),
      time: Number(data.time),
    };

    try {
      await axios.post(serviceEndpoint, payload, header);
      queryClient.invalidateQueries({ queryKey: ["getAllService"] });
      notify(
        "Serviço Registrado com Sucesso!",
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

  return { registerService };
};

export default UseService;
