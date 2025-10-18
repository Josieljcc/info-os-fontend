import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType, OrderResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

export type OrderSearchTerm = {
  clientName?: string;
  openingDate?: string;
  forecastDate?: string;
  status?: string;
};

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
    if (searchTerm.openingDate)
      params.append("openingDate", searchTerm.openingDate);
    if (searchTerm.forecastDate)
      params.append("forecastDate", searchTerm.forecastDate);
    if (searchTerm.status) params.append("status", searchTerm.status);

    try {
      const response = await axios.get(
        `${BASE_URL}/order?${params.toString()}`,
        header
      );
      return response.data.orders || [];
    } catch (err: any) {
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["getOrderBySearch", searchTerm],
    queryFn: getOrderBySearch,
    enabled,
  });
};
