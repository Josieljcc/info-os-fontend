import { BASE_URL } from "@/constants";
import { PartType } from "@/schemas/parts";
import { notifyPositionMap, notifyType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useNotify from "../useNotify";
import { useContext } from "react";
import UserContext from "@/context/userContext";

type UsePartProps = {
  partId?: number;
};

const useEditPart = ({ partId }: UsePartProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const queryClient = useQueryClient();

  const notify = useNotify();

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const urlEditPart = `${BASE_URL}/part/${partId}`;

  const editPartMutation = useMutation({
    mutationFn: (formData: PartType) => {
      const payload = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };
      return axios.put(urlEditPart, payload, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPart"] });
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
  return { editPartMutation };
};

export default useEditPart;
