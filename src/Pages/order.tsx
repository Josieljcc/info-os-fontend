import FormOrder from "@/components/formOrder/formOrder";
import UserContext from "@/context/userContext";
import { role } from "@/types";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  
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
  return <FormOrder />;
};

export default Order;
