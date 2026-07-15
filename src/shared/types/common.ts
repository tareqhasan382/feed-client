export interface AuthorSummary {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  limit: number;
}

export interface PaginationParams {
  cursor?: string | null;
  limit?: number;
}
