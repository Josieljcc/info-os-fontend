import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingClientType } from "@/schemas/editing";
import { registerClientType } from "@/schemas/registerClient";
import { Client, notifyPositionMap, notifyType } from "@/types";
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "../useNotify";

type ClientPaginatedResponse = {
  clients: Client[];
  totalPages: number;
  page: number;
};

type PageParam = {
  pageParam: number;
};

const useClient = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();

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

  const urlEditClient = `${BASE_URL}/client/${id}`;

  const editClientMutation = useMutation({
    mutationFn: (formData: editingClientType) => {
      const payload = formData;
      return axios.put(urlEditClient, payload, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getClient"] });
      notify(
        "Cliente Editado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    },
    onError: (error) => {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    },
  });

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
    registerClient,
    isLoading,
    clients,
    fetchNextPage,
    hasNextPage,
    getClientById,
    editClientMutation,
    isFetchingNextPage,
  };
};

export default useClient;
