import { BASE_URL } from "@/constants";
import { ServicesType } from "@/schemas/services";
import { notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import useNotify from "./useNotify";

const UseService = () => {
  const notify = useNotify();

  const registerService = async (data: ServicesType) => {
    const payload = {
      ...data,
      price: Number(data.price),
      time: Number(data.time),
    };
    const urlRegister = `${BASE_URL}/service`;

    try {
      await axios.post(urlRegister, payload);

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
