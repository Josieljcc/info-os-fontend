import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingClientType } from "@/schemas/editing";
import { registerClientType } from "@/schemas/registerClient";
import { Client, notifyPositionMap, notifyType } from "@/types";
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "../useNotify";
import { SearchTerm } from "./types";

type ClientPaginatedResponse = {
  clients: Client[];
  totalPages: number;
  page: number;
};

const PAGESIZE = 10;

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
  }: {
    pageParam: number;
  }): Promise<ClientPaginatedResponse | undefined> => {
    const urlClient = `${BASE_URL}/client?page=${pageParam}&pageSize=${PAGESIZE}`;

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
  } = useInfiniteQuery({
    queryKey: ["getAllClients"],
    queryFn: getAllClients,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const clients = paginatedClients?.pages.flatMap((page) => {
    return page?.clients;
  });

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
  };
};

export const useClientSearch = (searchTerm: SearchTerm, enabled: boolean) => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();
  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getClientBySearch = async (): Promise<Client[]> => {
    const params = new URLSearchParams();

    if (searchTerm.name) params.append("name", searchTerm.name);
    if (searchTerm.email) params.append("email", searchTerm.email);
    if (searchTerm.phone) params.append("phone", searchTerm.phone.toString());

    const urlClient = `${BASE_URL}/client?${params.toString()}`;

    try {
      const response = await axios.get(urlClient, header);
      return response.data.clients;
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["getClientBySearch", searchTerm],
    queryFn: getClientBySearch,
    enabled,
  });
};

export default useClient;
