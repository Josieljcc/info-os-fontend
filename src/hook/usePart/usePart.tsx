import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { PartType } from "@/schemas/parts";
import { notifyPositionMap, notifyType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

type UsePartProps = {
  partId?: number;
};

const usePart = ({ partId }: UsePartProps) => {
  const queryClient = useQueryClient();

  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerPart = async (data: PartType) => {
    const urlRegisterPart = `${BASE_URL}/part`;

    const payload = {
      ...data,
      quantity: !data.quantity ? 0 : Number(data.quantity),
      price: Number(data.price),
    };

    try {
      await axios.post(urlRegisterPart, payload, header);
      queryClient.invalidateQueries({ queryKey: ["getAllPart"] });
      notify(
        "Peça Registrada com Sucesso!",
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

  return { registerPart, editPartMutation };
};

export default usePart;
