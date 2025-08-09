import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { Client, notifyPositionMap, notifyType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { SearchTerm } from "./types";

type useClientSearchProps = {
  searchTerm: SearchTerm;
  enabled?: boolean;
};

export const useClientSearch = ({
  searchTerm,
  enabled = true,
}: useClientSearchProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getClientBySearch = async (): Promise<Client[]> => {
    const params = new URLSearchParams();

    if (searchTerm.name) params.append("name", searchTerm.name);
    if (searchTerm.email) params.append("email", searchTerm.email);
    if (searchTerm.phone) params.append("phone", searchTerm.phone.toString());

    const urlClient = `${BASE_URL}/client?${params.toString()}`;

    try {
      const response = await axios.get(urlClient, header);
      return response.data.clients;
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["getClientBySearch"],
    queryFn: getClientBySearch,
    enabled,
  });
};
