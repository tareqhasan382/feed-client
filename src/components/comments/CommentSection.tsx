import Spinner from '../shared/Spinner';
import EmptyState from '../shared/EmptyState';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useComments } from '../../hooks/useComments';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { comments, isLoading, isLoadingMore, hasMore, isCreating, loadMore, addComment } = useComments(postId);
  const { sentinelRef } = useInfiniteScroll({ onLoadMore: loadMore, hasMore, isLoading: isLoadingMore });

  return (
    <div className="_timline_comment_main">
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {isLoading && comments.length === 0 && <Spinner size={20} />}
        {!isLoading && comments.length === 0 && (
          <EmptyState message="No comments yet" />
        )}
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
        {hasMore && (
          <div ref={sentinelRef}>
            {isLoadingMore && <Spinner size={16} />}
          </div>
        )}
      </div>
      <CommentForm onSubmit={addComment} isLoading={isCreating} />
    </div>
  );
};

export default CommentSection;
