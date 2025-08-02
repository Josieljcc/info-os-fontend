import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { PageParam, Service, notifyPositionMap, notifyType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

type ServicePaginatedResponse = {
  services: Service[];
  totalPages: number;
  page: number;
};

const useGetService = () => {
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const getAllService = async ({
    pageParam,
  }: PageParam): Promise<ServicePaginatedResponse | undefined> => {
    const requestURL = `${BASE_URL}/service?page=${pageParam}`;
    try {
      const response = await axios.get(requestURL, header);
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
    data: paginatedService,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllService"],
    queryFn: getAllService,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const services = paginatedService
    ? paginatedService?.pages.flatMap((page) => {
        return page?.services;
      })
    : [];

  return {
    getAllService,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    services,
  };
};

export default useGetService;
