import { format, isSameDay } from "date-fns";

const formatToSave = (date: string) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

const formatToShow = (date: string | Date) => {
  return format(date, "dd/MM/yyyy");
};

type ForecastParams = {
  forecastdate?: string;
  forecastStartDate?: string;
  forecastEndDate?: string;
};

const getForecastParams = (
  startDate?: string,
  endDate?: string
): ForecastParams => {
  if (startDate && endDate && isSameDay(new Date(startDate), new Date(endDate))) {
    return { forecastdate: startDate };
  } else {
    return { forecastStartDate: startDate, forecastEndDate: endDate };
  }
};

export { formatToSave, formatToShow, getForecastParams };