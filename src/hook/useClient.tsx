import { BASE_URL } from "@/constants";
import { registerClientType } from "@/schemas/registerClient";
import { Client, notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useNotify from "./useNotify";
import UserContext from "@/context/userContext";
import { useContext, useState } from "react";

const useClient = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [isLoading, setIsLoading] = useState(true);

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerClient = async (data: registerClientType) => {
    const urlRegisterClient = `${BASE_URL}/client`;

    try {
      await axios.post(urlRegisterClient, data, header);

      notify(
        "Cliente Registrado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );

      navigate("/home");
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const getAllClients = async (page?: number, pageSize?: number) => {
    const urlClient = `${BASE_URL}/client?page=${page}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(urlClient, header);
      const data: Client[] = response.data.clients;
      setIsLoading(false);
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

  return { registerClient, getAllClients, isLoading };
};

export default useClient;
