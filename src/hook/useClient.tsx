import { BASE_URL } from "@/constants";
import { registerClientType } from "@/schemas/registerClient";
import { Client, notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useNotify from "./useNotify";
import UserContext from "@/context/userContext";
import { useContext, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type PaginatedResponse = {
  clients: Client[];
  totalPages: number;
  page: number;
};

const useClient = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [isLoading, setIsLoading] = useState(true);

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerClient = async (data: registerClientType) => {
    const urlRegisterClient = `${BASE_URL}/client`;

    try {
      await axios.post(urlRegisterClient, data, header);

      notify(
        "Cliente Registrado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );

      navigate("/home");
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const getAllClients = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<PaginatedResponse | undefined> => {
    const urlClient = `${BASE_URL}/client?page=${pageParam}&pageSize=${10}`;

    try {
      const response = await axios.get(urlClient, header);
      setIsLoading(false);
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
    data: pagenatedClients,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllClients"],
    queryFn: getAllClients,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const clients = pagenatedClients?.pages.flatMap((page) => {
    return page?.clients;
  });

  const getClientById = async (id: number) => {
    const urlClientById = `${BASE_URL}/client/${id}`;

    const response = await axios.get(urlClientById, header);
    return response.data;
  };

  const { data: client } = useQuery({
    queryKey: ["getClient"],
    queryFn: () => getClientById(1),
  });

  return {
    registerClient,
    getAllClients,
    isLoading,
    client,
    clients,
    fetchNextPage,
    hasNextPage,
  };
};

export default useClient;
