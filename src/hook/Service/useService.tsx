import { BASE_URL } from "@/constants";
import { ServicesType } from "@/schemas/services";
import { notifyPositionMap, notifyType, Service } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import useNotify from "../useNotify";

const UseService = () => {
  const notify = useNotify();

  const {
    user: { token },
  } = useContext(UserContext);

  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const serviceEndpoint = `${BASE_URL}/service`;

  const registerService = async (data: ServicesType) => {
    const payload = {
      ...data,
      price: Number(data.price),
      time: Number(data.time),
    };

    try {
      await axios.post(serviceEndpoint, payload, header);
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

  const getAllServices = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(serviceEndpoint, header);
      const data: Service[] = response.data.services;
      return data;
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  return { registerService, getAllServices };
};

export default UseService;
