import { useState, useCallback } from 'react';
import Modal from '../shared/Modal';
import Avatar from '../shared/Avatar';
import Spinner from '../shared/Spinner';
import EmptyState from '../shared/EmptyState';
import { useGetPostLikesQuery } from '../../features/likes/likesApi';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

interface LikersModalProps {
  postId: string;
  onClose: () => void;
}

const LikersModal = ({ postId, onClose }: LikersModalProps) => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const { data, isLoading, isFetching } = useGetPostLikesQuery({ postId, cursor, limit: 20 });

  const likers = data?.items ?? [];
  const hasMore = !!data?.nextCursor;
  const isLoadingMore = isFetching && cursor !== undefined;

  const loadMore = useCallback(() => {
    if (data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  }, [data?.nextCursor, isFetching]);

  const { sentinelRef } = useInfiniteScroll({ onLoadMore: loadMore, hasMore, isLoading: isLoadingMore });

  return (
    <Modal isOpen={true} onClose={onClose} title="Likes">
      {isLoading && <Spinner />}
      {!isLoading && likers.length === 0 && <EmptyState message="No likes yet" />}
      {likers.map((liker) => (
        <div key={liker.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
          <Avatar user={liker} size={36} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            {liker.firstName} {liker.lastName}
          </span>
        </div>
      ))}
      {hasMore && (
        <div ref={sentinelRef}>
          {isLoadingMore && <Spinner size={20} />}
        </div>
      )}
    </Modal>
  );
};

export default LikersModal;
