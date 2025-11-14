export type OrderSearchTerm = {
  clientName?: string;
  openingStartDate?: string;
  openingEndDate?: string;
  forecastStartDate?: string;
  forecastEndDate?: string;
  forecastdate?: string;
  status?: string;
};

export type OrderSearchField = keyof OrderSearchTerm;
