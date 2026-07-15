import { useState, memo } from 'react';
import type { PostFeedItem } from '../../features/posts/postTypes';
import { useTogglePostLikeMutation } from '../../features/likes/likesApi';
import { useDeletePostMutation } from '../../features/posts/postsApi';
import Avatar from '../shared/Avatar';
import AvatarStack from './AvatarStack';
import LikeButton from './LikeButton';
import CommentSection from '../comments/CommentSection';
import LikersModal from './LikersModal';
import EditPostModal from './EditPostModal';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import toast from 'react-hot-toast';

interface PostCardProps {
  post: PostFeedItem;
  currentUserId?: string;
}

const PostCard = memo(({ post, currentUserId }: PostCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [toggleLike] = useTogglePostLikeMutation();
  const [deletePost] = useDeletePostMutation();

  const isOwner = currentUserId === post.authorId;

  const handleDelete = async () => {
    setShowDropdown(false);
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(post.id).unwrap();
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  return (
    <>
      <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
        <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
          <div className="_feed_inner_timeline_post_top">
            <div className="_feed_inner_timeline_post_box">
              <div className="_feed_inner_timeline_post_box_image">
                <Avatar user={post.author} size={40} />
              </div>
              <div className="_feed_inner_timeline_post_box_txt">
                <h4 className="_feed_inner_timeline_post_box_title">{post.author.firstName} {post.author.lastName}</h4>
                <p className="_feed_inner_timeline_post_box_para">
                  {formatTimeAgo(post.createdAt)} . <a href="#0">{post.visibility === 'PUBLIC' ? 'Public' : 'Private'}</a>
                </p>
              </div>
            </div>
            <div className="_feed_inner_timeline_post_box_dropdown">
              <div className="_feed_timeline_post_dropdown">
                <button type="button" className="_feed_timeline_post_dropdown_link" onClick={() => setShowDropdown((p) => !p)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                    <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                    <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                    <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                  </svg>
                </button>
              </div>
              <div className={`_feed_timeline_dropdown _timeline_dropdown${showDropdown ? ' show' : ''}`}>
                <ul className="_feed_timeline_dropdown_list">
                  {isOwner && (
                    <>
                      <li className="_feed_timeline_dropdown_item">
                        <button
                          type="button"
                          className="_feed_timeline_dropdown_link"
                          onClick={() => { setShowEdit(true); setShowDropdown(false); }}
                          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                        >
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                              <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M13.4 2.6l2 2M7.5 10.5l-4.2 1.3 1.3-4.2L11 3.5a1.4 1.4 0 012 0l1.5 1.5a1.4 1.4 0 010 2L7.5 10.5z" />
                            </svg>
                          </span>
                          Edit Post
                        </button>
                      </li>
                      <li className="_feed_timeline_dropdown_item">
                        <button
                          type="button"
                          className="_feed_timeline_dropdown_link"
                          onClick={handleDelete}
                          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', color: '#ff4757' }}
                        >
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                              <path stroke="#ff4757" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.5 5h13M6.5 5V3.5a1 1 0 011-1h3a1 1 0 011 1V5m2 0v9.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 014.5 15V5h9z" />
                            </svg>
                          </span>
                          Delete Post
                        </button>
                      </li>
                    </>
                  )}
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z" />
                        </svg>
                      </span>
                      Save Post
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>
          {post.imageUrl && (
            <div className="_feed_inner_timeline_image">
              <img src={post.imageUrl} alt="" className="_time_img" />
            </div>
          )}
        </div>
        <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
          <div className="_feed_inner_timeline_total_reacts_image" style={{ cursor: 'pointer' }} onClick={() => post.likeCount > 0 && setShowLikers(true)}>
            {post.recentLikers.length > 0 && <AvatarStack users={post.recentLikers} max={3} />}
            {post.likeCount > 0 && (
              <p className="_feed_inner_timeline_total_reacts_para">{post.likeCount}</p>
            )}
          </div>
          <div className="_feed_inner_timeline_total_reacts_txt">
            <p className="_feed_inner_timeline_total_reacts_para1">
              <button
                type="button"
                onClick={() => setShowComments((p) => !p)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
              >
                <span>{post.commentCount}</span> Comment
              </button>
            </p>
          </div>
        </div>
        <div className="_feed_inner_timeline_reaction">
          <LikeButton isLiked={post.isLiked} likeCount={post.likeCount} onToggle={() => toggleLike(post.id)} />
          <button type="button" className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={() => setShowComments((p) => !p)}>
            <span className="_feed_inner_timeline_reaction_link">
              <span>
                <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                  <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
                  <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
                </svg>
                Comment
              </span>
            </span>
          </button>
          <button type="button" className="_feed_inner_timeline_reaction_share _feed_reaction">
            <span className="_feed_inner_timeline_reaction_link">
              <span>
                <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                  <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
                </svg>
                Share
              </span>
            </span>
          </button>
        </div>
        {showComments && (
          <div className="_feed_inner_timeline_cooment_area">
            <CommentSection postId={post.id} />
          </div>
        )}
      </div>
      {showLikers && <LikersModal postId={post.id} onClose={() => setShowLikers(false)} />}
      {showEdit && <EditPostModal post={post} onClose={() => setShowEdit(false)} />}
    </>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;
