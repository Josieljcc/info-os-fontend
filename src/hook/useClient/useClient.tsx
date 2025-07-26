import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingClientType } from "@/schemas/editing";
import { registerClientType } from "@/schemas/registerClient";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

type UseClientProps = {
  clientId?: number;
};

const useClient = ({ clientId }: UseClientProps) => {
  const notify = useNotify();
  const queryClient = useQueryClient();

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

  const urlEditClient = `${BASE_URL}/client/${clientId}`;

  const editClientMutation = useMutation({
    mutationFn: (formData: editingClientType) => {
      const payload = formData;
      return axios.put(urlEditClient, payload, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getClient"] });
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
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

  const deleteClient = async () => {
    try {
      await axios.delete(`${BASE_URL}/client/${clientId}`, header);
      queryClient.invalidateQueries({
        queryKey: ["getAllClients"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getClientBySearch"],
      });
      notify(
        "Cliente excluído com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    }
  };

  return {
    registerClient,
    editClientMutation,
    deleteClient,
  };
};

export default useClient;
