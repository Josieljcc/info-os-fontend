import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType, OrderResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { OrderSearchTerm } from "./types";

type useOrderSearchProps = {
  searchTerm: OrderSearchTerm;
  enabled?: boolean;
};

export const useOrderSearch = ({
  searchTerm,
  enabled = true,
}: useOrderSearchProps) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getOrderBySearch = async (): Promise<OrderResponse[]> => {
    const params = new URLSearchParams();
    if (searchTerm.clientName)
      params.append("clientName", searchTerm.clientName);
    if (searchTerm.openingStartDate)
      params.append("openingStartDate", searchTerm.openingStartDate);
    if (searchTerm.openingEndDate)
      params.append("openingEndDate", searchTerm.openingEndDate);
    if (searchTerm.forecastdate) {
      params.append("forecastDate", searchTerm.forecastdate);
    } else {
      if (searchTerm.forecastStartDate)
        params.append("forecastStartDate", searchTerm.forecastStartDate);
      if (searchTerm.forecastEndDate)
        params.append("forecastEndDate", searchTerm.forecastEndDate);
    }
    if (searchTerm.status) params.append("status", searchTerm.status);

    const url = `${BASE_URL}/order?${params.toString()}`;

    try {
      const response = await axios.get(url, header);
      return response.data.orders || [];
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      notify(errorMessage, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["getOrderBySearch", searchTerm],
    queryFn: getOrderBySearch,
    enabled,
  });
};
