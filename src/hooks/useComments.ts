import { useState, useCallback } from 'react';
import { useGetCommentsQuery, useCreateCommentMutation } from '../features/comments/commentsApi';

export const useComments = (postId: string) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isLoading, isFetching } = useGetCommentsQuery({ postId, cursor, limit: 5 });
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();

  const comments = data?.items ?? [];
  const hasMore = !!data?.nextCursor;
  const isLoadingMore = isFetching && cursor !== null;

  const loadMore = useCallback(() => {
    if (data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  }, [data?.nextCursor, isFetching]);

  const addComment = useCallback(
    async (content: string) => {
      await createComment({ postId, content }).unwrap();
    },
    [createComment, postId],
  );

  return {
    comments,
    isLoading,
    isLoadingMore,
    hasMore,
    isCreating,
    loadMore,
    addComment,
  };
};
