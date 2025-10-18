import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import {
  notifyPositionMap,
  notifyType,
  OrderResponse,
  PageParam,
} from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { useInfiniteQuery } from "@tanstack/react-query";

type OrderPaginatedResponse = {
  orders: OrderResponse[];
  totalPages: number;
  page: number;
};

const useOrder = () => {
  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const notify = useNotify();

  const registerOrder = async (payload: OrderType) => {
    const urlRegisterOrder = `${BASE_URL}/order`;
    try {
      await axios.post(urlRegisterOrder, payload, header);
      notify(
        "Ordem de Serviço Registrada com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const getAllOrder = async ({
    pageParam,
  }: PageParam): Promise<OrderPaginatedResponse | undefined> => {
    const urlOrderResponse = `${BASE_URL}/order?page=${pageParam}`;
    try {
      const response = await axios.get(urlOrderResponse, header);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const {
    data: paginatedOrder,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllOrder"],
    queryFn: getAllOrder,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const orders = paginatedOrder
    ? paginatedOrder?.pages.flatMap((page) => {
        return page?.orders;
      })
    : [];

  return {
    registerOrder,
    fetchNextPage,
    hasNextPage,
    isLoading,
    orders,
    isFetchingNextPage,
  };
};

export default useOrder;
