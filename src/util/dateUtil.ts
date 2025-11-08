import { format } from "date-fns";

const formatToSave = (date: string) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

const formatToShow = (date: string | Date) => {
  return format(date, "dd/MM/yyyy");
};

export { formatToSave, formatToShow };
