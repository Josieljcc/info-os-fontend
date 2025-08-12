import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useNotify from "../useNotify";

const useDeletePart = () => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const deletePart = async (partId: number) => {
    try {
      await axios.delete(`${BASE_URL}/part/${partId}`, header);
      queryClient.invalidateQueries({ queryKey: ["getAllPart"] });
      queryClient.invalidateQueries({ queryKey: ["getpartBySearch"] });
      notify(
        "Peça excluída com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    }
  };

  return { deletePart };
};

export default useDeletePart;
