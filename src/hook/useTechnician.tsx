import { BASE_URL } from "@/constants";
import { registerTechnicianType } from "@/schemas/registerTechnician";
import { notifyPositionMap, notifyType, Technician } from "@/types";
import axios, { AxiosError } from "axios";
import useNotify from "./useNotify";
import { useNavigate } from "react-router-dom";
import UserContext from "@/context/userContext";
import { useContext, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

type TechnicianPaginatedResponse = {
  technicians: Technician[];
  totalPages: number;
  page: number;
};

type PageParam = {
  pageParam: number;
};

const useTechnician = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [isLoading, setIsLoading] = useState(true);

  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

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
  

  const technicians = paginatedTechnicians
    ? paginatedTechnicians?.pages.flatMap((page) => {
        return page?.technicians;
      })
    : [];

  const registerTechnician = async (data: registerTechnicianType) => {
    const urlRegisterTechnician = `${BASE_URL}/register/technician`;

    try {
      await axios.post(urlRegisterTechnician, data);

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

  return {
    registerTechnician,
    getAllTechnician,
    isLoading,
    technicians,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useTechnician;
