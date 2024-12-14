import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { role } from "../types";
import { useNavigate } from "react-router-dom";

const RegisterClient = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser =
      JSON.parse(localStorage.getItem("user") as string) || {};

    if (
      user.role === role.client ||
      localStorageUser?.role === role.client ||
      (!user.token && !localStorageUser.token)
    ) {
      navigate("/login");
    }

    setUser(localStorageUser);
  }, []);

  return <p>Hello</p>;
};

export default RegisterClient;
