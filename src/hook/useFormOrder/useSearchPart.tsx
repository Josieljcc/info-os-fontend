import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType, Part } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";


type usePartSearchProps = {
  searchTerm: string;
  enabled?: boolean;
};

export const usePartSearch = ({
  searchTerm,
  enabled = true,
}: usePartSearchProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getPartBySearch = async (): Promise<Part[]> => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("name", searchTerm);

    const urlPart = `${BASE_URL}/part?${params.toString()}`;

    try {
      const response = await axios.get(urlPart, header);
      return response.data.parts;
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["getPartBySearch", searchTerm],
    queryFn: getPartBySearch,
    enabled,
  });
};
