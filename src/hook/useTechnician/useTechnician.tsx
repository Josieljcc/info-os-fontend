import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType } from "@/types";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useNotify from "../useNotify";

type UseTechnicianProps = {
  technicianId?: number;
};

const useTechnician = ({ technicianId }: UseTechnicianProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const queryClient = useQueryClient();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const deleteTechnician = async () => {
    try {
      await axios.delete(`${BASE_URL}/technician/${technicianId}`, header);
      queryClient.invalidateQueries({ queryKey: ["getAllTechnicians"] });
      queryClient.invalidateQueries({ queryKey: ["getTechnicianBySearch"] });

      notify(
        "Técnico excluído com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;
      notify(
        err.message || "Erro ao excluir técnico.",
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  return {
    deleteTechnician,
  };
};

export default useTechnician;
