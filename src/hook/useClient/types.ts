export type GetAllClientsParams = {
    pageParam: number;
    searchTerm?: SearchTerm;
  };

export type SearchTerm = {
    name?: string;
    email?: string;
    phone?: number;
}

export type SearchField = keyof SearchTerm;