import { BASE_URL } from "@/constants";
import UserContext from "@/context/userContext";
import { Service, notifyPositionMap, notifyType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import useNotify from "../useNotify";

type useServiceSearchProps = {
    searchTerm: string;
    enabled?: boolean;
}

export const useServiceSearch = ({ searchTerm, enabled = true }: useServiceSearchProps) => {
    const {
        user: { token },
    } = useContext(UserContext);

    const notify = useNotify();
    const header = { headers: { Authorization: `Bearer ${token}` } };

    const getServiceBySearch = async (): Promise<Service[]> => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("name", searchTerm);

        const urlService = `${BASE_URL}/service?${params.toString()}`;

        try {
            const response = await axios.get(urlService, header);
            return response.data.services;
        } catch (error) {
            const err = error as AxiosError;
            notify(err.message, notifyPositionMap.topRight, notifyType.error);
            return [];
        }
    };

    return useQuery({
        queryKey: ["getServiceBySearch", searchTerm],
        queryFn: getServiceBySearch,
        enabled,
    });
};
