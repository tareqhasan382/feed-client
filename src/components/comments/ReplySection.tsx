import Spinner from '../shared/Spinner';
import EmptyState from '../shared/EmptyState';
import ReplyItem from './ReplyItem';
import CommentForm from './CommentForm';
import { useReplies } from '../../hooks/useReplies';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

interface ReplySectionProps {
  commentId: string;
  postId: string;
}

const ReplySection = ({ commentId, postId }: ReplySectionProps) => {
  const { replies, isLoading, isLoadingMore, hasMore, isCreating, loadMore, addReply } = useReplies(commentId);
  const { sentinelRef } = useInfiniteScroll({ onLoadMore: loadMore, hasMore, isLoading: isLoadingMore });

  if (isLoading) return <Spinner size={20} />;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {replies.length === 0 && !isLoading && (
          <EmptyState message="No replies yet" />
        )}
        {replies.map((reply) => (
          <ReplyItem key={reply.id} reply={reply} postId={postId} />
        ))}
        {hasMore && (
          <div ref={sentinelRef}>
            {isLoadingMore && <Spinner size={16} />}
          </div>
        )}
      </div>
      <CommentForm onSubmit={addReply} isLoading={isCreating} placeholder="Write a reply" />
    </div>
  );
};

export default ReplySection;
