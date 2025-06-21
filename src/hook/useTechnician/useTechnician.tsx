import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingTechnicianType } from "@/schemas/editingTechnician";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { notifyPositionMap, notifyType } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
    const urlRegisterTechnician = `${BASE_URL}/register/technician`;
    try {
      await axios.post(urlRegisterTechnician, data, header);
      queryClient.invalidateQueries({ queryKey: ["getAllTechnicians"] });
      notify(
        "Técnico Registrado com Sucesso!",
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

  const urlEditTechnician = `${BASE_URL}/technician/${id}`;

  const editTechnicianMutation = useMutation({
    mutationFn: (formData: editingTechnicianType) => {
      return axios.put(urlEditTechnician, formData, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTechnician"] });
      notify(
        "Técnico Editado com Sucesso!",
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
    registerTechnician,
    editTechnicianMutation,
  };
};

export default useTechnician;
