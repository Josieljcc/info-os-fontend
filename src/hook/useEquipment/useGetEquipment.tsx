import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { PageParam, notifyPositionMap, notifyType } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";
import { EquipmentType } from "@/schemas/equipment";
import { useInfiniteQuery } from "@tanstack/react-query";

type EquipmentPaginatedResponse = {
  equipments: EquipmentType[];
  totalPages: number;
  page: number;
};

const useGetEquipment = () => {


  const notify = useNotify();
  const {
    user: { token },
  } = useContext(UserContext);

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getAllEquipments = async ({
    pageParam,
  }: PageParam): Promise<EquipmentPaginatedResponse | undefined> => {
    const urlEquipment = `${BASE_URL}/equipment?page=${pageParam}&pageSize=${10}`;

    try {
      const response = await axios.get(urlEquipment, header);
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
    data: paginatedEquipments,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllEquipments"],
    queryFn: getAllEquipments,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const equipments = paginatedEquipments
    ? paginatedEquipments?.pages.flatMap((page) => {
        return page?.equipments;
      })
    : [];

  const getEquipmentById = async (id: string): Promise<EquipmentType> => {
    const urlEquipmentById = `${BASE_URL}/equipment/${id}`;
    const response = await axios.get(urlEquipmentById, header);
    return response.data;
  };

  return {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    equipments,
    getEquipmentById,
  };
};

export default useGetEquipment;
