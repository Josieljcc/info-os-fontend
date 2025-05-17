import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { editingTechnicianType } from "@/schemas/editingTechnician";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { Technician, notifyPositionMap, notifyType } from "@/types";
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "./useNotify";

type TechnicianPaginatedResponse = {
  technician: Technician[];
  totalPages: number;
  page: number;
};

const PAGESIZE = 10;

const useTechnician = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerTechnician = async (data: registerTechnicianType) => {
    const urlRegisterTechnician = `${BASE_URL}/technician`;

    try {
      await axios.post(urlRegisterTechnician, data, header);

      notify(
        "Técnico Registrado com Sucesso!",
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

  const urlEditTechnician = `${BASE_URL}/technician/${id}`;

  const editTechnicianMutation = useMutation({
    mutationFn: (formData: editingTechnicianType) => {
      const payload = formData;
      return axios.put(urlEditTechnician, payload, header);
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

  const getAllTechnicians = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<TechnicianPaginatedResponse | undefined> => {
    const urlTechnician = `${BASE_URL}/technician?page=${pageParam}&pageSize=${PAGESIZE}`;

    try {
      const response = await axios.get(urlTechnician, header);
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
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["getAllTechnicians"],
    queryFn: getAllTechnicians,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const technicians = paginatedTechnicians?.pages.flatMap((page) => {
    return page?.technician;
  });

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
    getTechnicianById,
    editTechnicianMutation,
  };
};

export default useTechnician;
