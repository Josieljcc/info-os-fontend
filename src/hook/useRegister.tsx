import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";
import { registerTechnicianType } from "../schemas/registerTechnician";
import { useNavigate } from "react-router-dom";
import useNotify from "./useNotify";
import { notifyPositionMap, notifyType } from "../types";
import { registerClientType } from "../schemas/registerClient";
import { PartType } from "@/schemas/parts";
import { ServicesType } from "@/schemas/services";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import { EquipmentType } from "@/schemas/equipment";

const useRegister = () => {
  const navigate = useNavigate();

  const notify = useNotify();

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

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

  const registerClient = async (data: registerClientType) => {
    const urlRegisterClient = `${BASE_URL}/client`;

    try {
      await axios.post(urlRegisterClient, data, header);

      notify(
        "Cliente Registrado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );

      navigate("/home");
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const registerPart = async (data: PartType) => {
    const urlRegisterPart = `${BASE_URL}/part`;

    const payload = {
      ...data,
      quantity: !data.quantity ? 0 : Number(data.quantity),
      price: Number(data.price),
    };

    try {
      await axios.post(urlRegisterPart, payload, header);

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

  const registerService = async (data: ServicesType) => {
    const payload = {
      ...data,
      price: Number(data.price),
      time: Number(data.time),
    };
    const urlRegister = `${BASE_URL}/service`;

    try {
      await axios.post(urlRegister, payload);

      notify(
        "Serviço Registrado com Sucesso!",
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

  const registerEquipment = async (data: EquipmentType) => {
    const urlRegisterEquipment = `${BASE_URL}/equipment`;
    try {
      await axios.post(urlRegisterEquipment, data, header);
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  return {
    registerTechnician,
    registerClient,
    registerPart,
    registerService,
    registerEquipment,
  };
};

export default useRegister;
