import { BASE_URL } from "@/constants";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import useNotify from "./useNotify";
import { useNavigate } from "react-router-dom";

const useTechnician = () => {
  const navigate = useNavigate();

  const notify = useNotify();

  const registerTechnician = async (data: registerTechnicianType) => {
    const urlRegisterTechnician = `${BASE_URL}/register/technician`;

    try {
      await axios.post(urlRegisterTechnician, data);

      notify(
        "Técnico Registrado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError;
      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  return { registerTechnician };
};

export default useTechnician;
