import { BASE_URL } from "@/constants";
import { registerClientType } from "@/schemas/registerClient";
import { Client, notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useNotify from "./useNotify";
import UserContext from "@/context/userContext";
import { useContext } from "react";

const useClient = () => {
  const navigate = useNavigate();

  const notify = useNotify();

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

  const getAllClients = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/client`, header);
      const data: Client[] = response.data.clients;
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

  return { registerClient, getAllClients };
};

export default useClient;
