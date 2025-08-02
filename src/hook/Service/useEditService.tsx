import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { ServicesType } from "@/schemas/services";


type UseServiceProps = {
  serviceId?: number;
};

const useEditService = ({ serviceId }: UseServiceProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const queryClient = useQueryClient();

  const notify = useNotify();

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const urlEditService = `${BASE_URL}/service/${serviceId}`;

  const editServiceMutation = useMutation({
    mutationFn: (formData: ServicesType) => {
      
      return axios.put(urlEditService, formData, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllService"] });
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
  return { editServiceMutation };
};

export default useEditService;
