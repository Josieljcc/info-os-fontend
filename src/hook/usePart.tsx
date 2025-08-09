import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { PartType } from "@/schemas/parts";
import { notifyPositionMap, notifyType, PageParam, Part } from "@/types";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "./useNotify";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

type PartPaginatedResponse = {
  parts: Part[];
  totalPages: number;
  page: number;
};

const usePart = ({ partId }: { partId?: number } = {}) => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useContext(UserContext);

  const notify = useNotify();

  const header = { headers: { Authorization: `Bearer ${token}` } };

  const registerPart = async (data: PartType) => {
    const urlRegisterPart = `${BASE_URL}/part`;

    const payload = {
      ...data,
      quantity: !data.quantity ? 0 : Number(data.quantity),
      price: Number(data.price),
    };

    try {
      await axios.post(urlRegisterPart, payload, header);
      queryClient.invalidateQueries({ queryKey: ["getAllPart"] });
      notify(
        "Peça Registrada com Sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;

      notify(
        err.message as string,
        notifyPositionMap.topRight,
        notifyType.error
      );
    }
  };

  const getAllPart = async ({
    pageParam,
  }: PageParam): Promise<PartPaginatedResponse | undefined> => {
    const requestURL = `${BASE_URL}/part?page=${pageParam}`;
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

  const deletePart = async () => {
    try {
      await axios.delete(`${BASE_URL}/part/${partId}`, header);
      queryClient.invalidateQueries({ queryKey: ["getAllPart"] });
      queryClient.invalidateQueries({ queryKey: ["getPartBySearch"] });
      notify(
        "Peça excluída com sucesso!",
        notifyPositionMap.topRight,
        notifyType.success
      );
    } catch (error) {
      const err = error as AxiosError;
      notify(err.message, notifyPositionMap.topRight, notifyType.error);
    }
  };

  const {
    data: paginatedPart,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllPart"],
    queryFn: getAllPart,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages === lastPage?.page) return;
      return Number(lastPage?.page) + 1;
    },
  });

  const parts = paginatedPart
    ? paginatedPart?.pages.flatMap((page) => {
        return page?.parts;
      })
    : [];

  return {
    registerPart,
    getAllPart,
    fetchNextPage,
    deletePart,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    parts,
  };
};

export default usePart;
