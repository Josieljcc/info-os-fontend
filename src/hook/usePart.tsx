import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { PartType } from "@/schemas/parts";
import { notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "./useNotify";

const usePart = () => {
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

  return { registerPart };
};

export default usePart;
