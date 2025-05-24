import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";
import { loginType } from "../schemas/login";
import useNotify from "./useNotify";
import { notifyPositionMap, notifyType } from "../types";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const notify = useNotify();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const postLogin = async (data: loginType) => {
    const urlLogin = `${BASE_URL}/login`;

    try {
      const response = await axios.post(urlLogin, data);
      const userLogin = response.data;
      setUser(userLogin);
      localStorage.setItem("user", JSON.stringify(userLogin));
      navigate("/app");
    } catch (error) {
      const err = error as AxiosError;
      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };
  return { postLogin };
};

export default useLogin;
