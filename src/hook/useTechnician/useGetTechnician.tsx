import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import useNotify from "../useNotify";
import { Technician, notifyPositionMap, notifyType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
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

  const getAllTechnician = async ({ pageParam }: { pageParam: number }): Promise<TechnicianPaginatedResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/technician?page=${pageParam}`, header);
      return response.data;
    } catch (err: any) {
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
      return { technicians: [], totalPages: 0, page: 0 };
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
      if (!lastPage || lastPage.page >= lastPage.totalPages) return undefined;
      return lastPage.page + 1;
    },
  });

  const technicians = paginatedTechnicians?.pages.flatMap((p) => p.technicians) || [];

  const getTechnicianById = async (id: string): Promise<Technician> => {
    const response = await axios.get(`${BASE_URL}/technician/${id}`, header);
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