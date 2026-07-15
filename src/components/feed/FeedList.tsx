import PostCard from './PostCard';
import CreatePostForm from './CreatePostForm';
import Spinner from '../shared/Spinner';
import EmptyState from '../shared/EmptyState';
import { useFeed } from '../../hooks/useFeed';
import { useAuth } from '../../hooks/useAuth';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const FeedList = () => {
  const { posts, isLoading, isLoadingMore, hasMore, error, loadMore } = useFeed();
  const { user } = useAuth();
  const { sentinelRef } = useInfiniteScroll({ onLoadMore: loadMore, hasMore, isLoading: isLoadingMore });

  return (
    <>
      <CreatePostForm />
      {isLoading && posts.length === 0 && <Spinner />}
      {!isLoading && error && (
        <div style={{ textAlign: 'center', padding: 20, color: '#ff4757' }}>
          <p>Failed to load posts. Please try again.</p>
        </div>
      )}
      {!isLoading && !error && posts.length === 0 && (
        <EmptyState message="No posts yet. Be the first to post!" />
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUserId={user?.id} />
      ))}
      {hasMore && (
        <div ref={sentinelRef}>
          {isLoadingMore && <Spinner />}
        </div>
      )}
    </>
  );
};

export default FeedList;
