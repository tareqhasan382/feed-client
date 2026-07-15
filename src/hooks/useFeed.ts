import { useState, useCallback } from 'react';
import { useGetPostsQuery } from '../features/posts/postsApi';

export const useFeed = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isLoading, isFetching, error } = useGetPostsQuery({ cursor, limit: 10 });

  const posts = data?.items ?? [];
  const hasMore = !!data?.nextCursor;
  const isLoadingMore = isFetching && cursor !== null;

  const loadMore = useCallback(() => {
    if (data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  }, [data?.nextCursor, isFetching]);

  return {
    posts,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
    refetch: () => setCursor(null),
  };
};
