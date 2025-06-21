import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingTechnicianType } from "@/schemas/editingTechnician";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { Technician, notifyPositionMap, notifyType, PageParam } from "@/types";
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "./useNotify";

type TechnicianPaginatedResponse = {
  technicians: Technician[];
  totalPages: number;
  page: number;
};

const useTechnician = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerTechnician = async (data: registerTechnicianType) => {
    const urlRegisterTechnician = `${BASE_URL}/register/technician`;

    try {
      await axios.post(urlRegisterTechnician, data, header);
      notify(
        "Técnico Registrado com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError;
      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const urlEditTechnician = `${BASE_URL}/technician/${id}`;

  const editTechnicianMutation = useMutation({
    mutationFn: (formData: editingTechnicianType) => {
      return axios.put(urlEditTechnician, formData, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTechnician"] });
      notify(
        "Técnico Editado com Sucesso!",
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

  const getAllTechnician = async ({
    pageParam,
  }: PageParam): Promise<TechnicianPaginatedResponse | undefined> => {
    const urlTechnician = `${BASE_URL}/technician?page=${pageParam}`;
    try {
      const response = await axios.get(urlTechnician, header);
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
    data: paginatedTechnicians,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllTechnicians"],
    queryFn: getAllTechnician,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const technicians =
    paginatedTechnicians?.pages.flatMap((page) => page?.technicians) ?? [];

  const getTechnicianById = async (id: string): Promise<Technician> => {
    const urlTechnicianById = `${BASE_URL}/technician/${id}`;
    const response = await axios.get(urlTechnicianById, header);
    return response.data;
  };

  return {
    registerTechnician,
    isLoading,
    technicians,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getTechnicianById,
    editTechnicianMutation,
    getAllTechnician,
  };
};

export default useTechnician;
