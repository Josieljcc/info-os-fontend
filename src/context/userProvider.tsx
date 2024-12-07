import React, { useState } from "react";
import UserContext from "./userContext";
import { role, User } from "../types";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({
    email: "",
    role: role.admin,
    token: "",
  });

  const initialState = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={initialState}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
