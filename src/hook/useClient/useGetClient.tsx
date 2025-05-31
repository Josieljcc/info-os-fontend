import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { PageParam, notifyPositionMap, notifyType, Client } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

type ClientPaginatedResponse = {
  clients: Client[];
  totalPages: number;
  page: number;
};

const useGetClient = () => {
  const notify = useNotify();
  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getAllClients = async ({
    pageParam,
  }: PageParam): Promise<ClientPaginatedResponse | undefined> => {
    const urlClient = `${BASE_URL}/client?page=${pageParam}&pageSize=${10}`;

    try {
      const response = await axios.get(urlClient, header);
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
    data: paginatedClients,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllClients"],
    queryFn: getAllClients,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      if (lastPage?.totalPages === 0) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const clients = paginatedClients
    ? paginatedClients?.pages.flatMap((page) => {
        return page?.clients;
      })
    : [];

  const getClientById = async (id: string): Promise<Client> => {
    const urlClientById = `${BASE_URL}/client/${id}`;
    const response = await axios.get(urlClientById, header);
    return response.data;
  };
  return {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    clients,
    getClientById,
  };
};

export default useGetClient;
