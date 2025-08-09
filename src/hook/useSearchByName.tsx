import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "./useNotify";

type useSearchByNameProps = {
  url?: string;
  name?: string;
  enabled?: boolean;
};

function useSearchByName<T = any>({
  url,
  name,
  enabled = true,
}: useSearchByNameProps) {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getBySearch = async (): Promise<T[]> => {
    const params = new URLSearchParams();
    if (name) params.append("name", name);

    const baseUrl = `${BASE_URL}/${url}?${params}`;

    try {
      const response = await axios.get(baseUrl, headers);
      const key = `${url}s`;
      return response.data[key];
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: [`get${url}BySearch`],
    queryFn: getBySearch,
    enabled,
  });
}

export default useSearchByName;
