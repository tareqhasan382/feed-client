import { useState, useCallback } from 'react';
import { useGetRepliesQuery, useCreateReplyMutation } from '../features/comments/commentsApi';

export const useReplies = (commentId: string) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isLoading, isFetching } = useGetRepliesQuery({ commentId, cursor, limit: 5 });
  const [createReply, { isLoading: isCreating }] = useCreateReplyMutation();

  const replies = data?.items ?? [];
  const hasMore = !!data?.nextCursor;
  const isLoadingMore = isFetching && cursor !== null;

  const loadMore = useCallback(() => {
    if (data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  }, [data?.nextCursor, isFetching]);

  const addReply = useCallback(
    async (content: string) => {
      await createReply({ commentId, content }).unwrap();
    },
    [createReply, commentId],
  );

  return {
    replies,
    isLoading,
    isLoadingMore,
    hasMore,
    isCreating,
    loadMore,
    addReply,
  };
};
