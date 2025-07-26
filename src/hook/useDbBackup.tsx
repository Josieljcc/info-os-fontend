import UserContext from "@/context/userContext";
import { useContext } from "react";
import useNotify from "./useNotify";
import axios, { AxiosError } from "axios";
import { notifyPositionMap, notifyType } from "@/types";
import { BASE_URL } from "@/constants";

const useDbBackup = () => {
    const notify = useNotify();

    const {
        user: { token },
    } = useContext(UserContext);

    const header = { headers: { Authorization: `Bearer ${token}` } };

    const downloadBackup = async () => {
        const urlBackup = `${BASE_URL}/backup`;

        try {
            const response = await axios.get(urlBackup, { ...header, responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            const contentDisposition = response.headers["content-disposition"];
            const fileName = contentDisposition
                ? contentDisposition.split("filename=")[1]
                : "backup.sql";

            link.setAttribute("download", fileName.replace(/"/g, ""));
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            notify(
                "Backup realizado com sucesso!",
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

    const uploadBackup = async (file: File) => {
        const urlRestore = `${BASE_URL}/restore`;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(urlRestore, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            notify(
                "Backup restaurado com sucesso!",
                notifyPositionMap.topRight,
                notifyType.success
            );
        } catch (error) {
            const err = error as AxiosError;
            notify(
                err.response?.data as string || "Erro ao restaurar backup.",
                notifyPositionMap.topRight,
                notifyType.error
            );
        }
    };

    return { downloadBackup, uploadBackup };

};

export default useDbBackup;