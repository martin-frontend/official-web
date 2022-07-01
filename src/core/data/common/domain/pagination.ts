export interface Pageable {
  page: number;
  size: number;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
}

export interface Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
