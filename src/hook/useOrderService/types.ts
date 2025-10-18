export type OrderSearchTerm = {
  clientName?: string;
  openingDate?: string;
  forecastDate?: string;
  status?: string;
};

export type OrderSearchField = keyof OrderSearchTerm;
