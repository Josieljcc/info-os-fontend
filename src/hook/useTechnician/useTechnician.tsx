import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingTechnicianType } from "@/schemas/editingTechnician";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useNotify from "../useNotify";

const useTechnician = () => {
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerTechnician = async (data: registerTechnicianType) => {
    try {
      await axios.post(`${BASE_URL}/register/technician`, data, header);
      queryClient.invalidateQueries({ queryKey: ["getAllTechnicians"] });
      notify("Técnico Registrado com Sucesso!", notifyPositionMap.topRight, notifyType.success);
    } catch (err: any) {
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    }
  };

  const editTechnicianMutation = useMutation({
    mutationFn: (formData: editingTechnicianType) => axios.put(`${BASE_URL}/technician/${id}`, formData, header),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTechnician"] });
      notify("Técnico Editado com Sucesso!", notifyPositionMap.topRight, notifyType.success);
    },
    onError: (err: any) => {
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    },
  });

  return { registerTechnician, editTechnicianMutation };
};

export default useTechnician;