export type FilterParams = {
  searchText?: string;
  page: number;
  sort: {
    createdOn: 'desc' | 'asc';
  };
  from?: number;
  to?: number;
};
