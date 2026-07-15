import { memo } from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onToggle: () => void;
  onClickCount?: () => void;
  size?: 'sm' | 'md';
}

const LikeButton = memo(({ isLiked, likeCount, onToggle, onClickCount, size = 'md' }: LikeButtonProps) => {
  const iconSize = size === 'sm' ? 16 : 19;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <button
        type="button"
        onClick={onToggle}
        className={`_feed_inner_timeline_reaction_emoji _feed_reaction${isLiked ? ' _feed_reaction_active' : ''}`}
        style={{ display: 'flex', alignItems: 'center', gap: 4 }}
      >
        <span className="_feed_inner_timeline_reaction_link">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={isLiked ? '#377DFF' : 'none'} stroke={isLiked ? '#377DFF' : '#000'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </span>
        </span>
      </button>
      {onClickCount && (
        <button
          type="button"
          onClick={onClickCount}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, color: '#666' }}
        >
          {likeCount}
        </button>
      )}
      {!onClickCount && likeCount > 0 && (
        <span style={{ fontSize: 13, color: '#666' }}>{likeCount}</span>
      )}
    </div>
  );
});

LikeButton.displayName = 'LikeButton';
export default LikeButton;
