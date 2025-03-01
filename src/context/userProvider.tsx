import React, { useState } from "react";
import UserContext from "./userContext";
import { role, User } from "../types";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const localStorageUser =
    JSON.parse(localStorage.getItem("user") as string) || {};

  const [user, setUser] = useState<User>({
    id: localStorageUser.id || 0,
    email: localStorageUser.email || "",
    role: localStorageUser.role || role.admin,
    token: localStorageUser.token || "",
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
