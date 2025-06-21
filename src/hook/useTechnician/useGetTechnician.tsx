import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import useNotify from "../useNotify";
import { Technician, PageParam, notifyPositionMap, notifyType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";

type TechnicianPaginatedResponse = {
  technicians: Technician[];
  totalPages: number;
  page: number;
};

const useGetTechnician = () => {
  const notify = useNotify();
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
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllTechnicians"],
    queryFn: getAllTechnician,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      if (lastPage?.totalPages === 0) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const technicians = paginatedTechnicians
    ? paginatedTechnicians?.pages.flatMap((page) => {
        return page?.technicians;
      })
    : [];

  const getTechnicianById = async (id: string): Promise<Technician> => {
    const urlTechnicianById = `${BASE_URL}/technician/${id}`;
    const response = await axios.get(urlTechnicianById, header);
    return response.data;
  };

  return {
    fetchNextPage,
    hasNextPage,
    isLoading,
    technicians,
    isFetchingNextPage,
    getTechnicianById,
  };
};

export default useGetTechnician;
