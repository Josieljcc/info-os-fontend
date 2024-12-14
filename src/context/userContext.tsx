import { createContext } from "react";
import { User } from "../types";

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
