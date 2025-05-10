import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { notifyPositionMap, notifyType, Order, Os } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "./useNotify";
import { useInfiniteQuery } from "@tanstack/react-query";

export type PageParam = {
  pageParam: number;
};

type OsPaginatedResponse = {
  orders: Os[];
  totalPages: number;
  page: number;
};

const useOrder = () => {
  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const notify = useNotify();

  const registerOrder = async (payload: Order) => {
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

  const getAllOs = async ({
    pageParam,
  }: PageParam): Promise<OsPaginatedResponse | undefined> => {
    const urlOs = `${BASE_URL}/order?page=${pageParam}`;
    try {
      const response = await axios.get(urlOs, header);
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
    data: paginatedOs,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["getAllOs"],
    queryFn: getAllOs,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const orders = paginatedOs
    ? paginatedOs?.pages.flatMap((page) => {
        return page?.orders;
      })
    : [];

  return { registerOrder, fetchNextPage, hasNextPage, isLoading, orders };
};

export default useOrder;
