import { memo, useState } from 'react';
import type { Comment as CommentType } from '../../features/comments/commentTypes';
import { useToggleCommentLikeMutation } from '../../features/likes/likesApi';
import Avatar from '../shared/Avatar';
import ReplySection from './ReplySection';
import { formatTimeAgo } from '../../utils/formatTimeAgo';

interface CommentItemProps {
  comment: CommentType;
  postId: string;
}

const CommentItem = memo(({ comment, postId }: CommentItemProps) => {
  const [toggleLike] = useToggleCommentLikeMutation();
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <a href="#0" className="_comment_image_link">
          <Avatar user={comment.author} size={32} />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="#0">
                <h4 className="_comment_name_title">{comment.author.firstName} {comment.author.lastName}</h4>
              </a>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.content}</span>
            </p>
          </div>
          {(comment.likeCount > 0) && (
            <div className="_total_reactions">
              <div className="_total_react">
                <span className="_reaction_like">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={comment.isLiked ? '#377DFF' : 'none'} stroke={comment.isLiked ? '#377DFF' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </span>
              </div>
              <span className="_total">{comment.likeCount}</span>
            </div>
          )}
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <button
                    type="button"
                    onClick={() => toggleLike({ commentId: comment.id, postId })}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontWeight: comment.isLiked ? 600 : 400,
                      color: comment.isLiked ? '#377DFF' : '#666',
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={comment.isLiked ? '#377DFF' : 'none'} stroke={comment.isLiked ? '#377DFF' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    {comment.isLiked ? 'Liked' : 'Like'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowReplies((prev) => !prev)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#666' }}
                  >
                    Reply.
                  </button>
                </li>
                <li>
                  <span className="_time_link">{formatTimeAgo(comment.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
          {comment.replyCount > 0 && !showReplies && (
            <button
              type="button"
              onClick={() => setShowReplies(true)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#377DFF', fontSize: 13, fontWeight: 500, marginTop: 4 }}
            >
              View {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
            </button>
          )}
        </div>
        {showReplies && <ReplySection commentId={comment.id} postId={postId} />}
      </div>
    </div>
  );
});

CommentItem.displayName = 'CommentItem';
export default CommentItem;
