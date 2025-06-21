import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType, Technician } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { SearchTerm } from "./types";

type useTechnicianSearchProps = {
  searchTerm: SearchTerm;
  enabled?: boolean;
};

export const useTechnicianSearch = ({
  searchTerm,
  enabled = true,
}: useTechnicianSearchProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getTechnicianBySearch = async (): Promise<Technician[]> => {
    const params = new URLSearchParams();

    if (searchTerm.name) params.append("name", searchTerm.name);
    if (searchTerm.email) params.append("email", searchTerm.email);
    if (searchTerm.phone) params.append("phone", searchTerm.phone.toString());

    const urlTechnician = `${BASE_URL}/technician?${params.toString()}`;

    try {
      const response = await axios.get(urlTechnician, header);
      return response.data.technicians;
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["getTechnicianBySearch", searchTerm],
    queryFn: getTechnicianBySearch,
    enabled,
  });
};
