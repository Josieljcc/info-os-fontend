import { BASE_URL } from "@/constants";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { notifyPositionMap, notifyType, Technician } from "@/types";
import axios, { AxiosError } from "axios";
import useNotify from "./useNotify";
import { useNavigate } from "react-router-dom";
import UserContext from "@/context/userContext";
import { useContext, useState } from "react";

const useTechnician = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [isLoading, setIsLoading] = useState(true);

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };
  console.log("token", token);

  const getAllTechnician = async (
    page: number,
    pageSize: number
  ): Promise<{ technician: Technician[]; totalPages: number } | undefined> => {
    const urlTechnician = `${BASE_URL}/technician?page=${page}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(urlTechnician, header);
      setIsLoading(false);
      return {
        technician: response.data.technicians,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      const err = error as AxiosError;
      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

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

  return { registerTechnician, getAllTechnician, isLoading };
};

export default useTechnician;
