import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";
import { registerTechnicianType } from "../schemas/registerTechnician";
import { useNavigate } from "react-router-dom";
import useNotify from "./useNotify";
import { notifyPositionMap, notifyType } from "../types";

const useRegister = () => {
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

export default useRegister;
