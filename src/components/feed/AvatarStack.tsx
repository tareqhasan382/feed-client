import type { AuthorSummary } from '../../shared/types/common';
import Avatar from '../shared/Avatar';

interface AvatarStackProps {
  users: AuthorSummary[];
  max?: number;
}

const AvatarStack = ({ users, max = 3 }: AvatarStackProps) => {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  if (visible.length === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', marginRight: 4 }}>
        {visible.map((user, i) => (
          <div key={user.id} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: max - i, position: 'relative' }}>
            <Avatar user={user} size={24} />
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <span style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>+{remaining} others</span>
      )}
    </div>
  );
};

export default AvatarStack;
