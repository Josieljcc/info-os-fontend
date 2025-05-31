import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingClientType } from "@/schemas/editing";
import { registerClientType } from "@/schemas/registerClient";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useNotify from "../useNotify";

const useClient = () => {
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerClient = async (data: registerClientType) => {
    const urlRegisterClient = `${BASE_URL}/client`;
    try {
      await axios.post(urlRegisterClient, data, header);
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
      notify(
        "Cliente Registrado com Sucesso!",
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

  const urlEditClient = `${BASE_URL}/client/${id}`;

  const editClientMutation = useMutation({
    mutationFn: (formData: editingClientType) => {
      const payload = formData;
      return axios.put(urlEditClient, payload, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getClient"] });
      notify(
        "Cliente Editado com Sucesso!",
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

  return {
    registerClient,
    editClientMutation,
  };
};

export default useClient;
