import type { AuthorSummary } from '../../shared/types/common';

interface AvatarProps {
  user: Pick<AuthorSummary, 'firstName' | 'lastName' | 'avatar'>;
  size?: number;
}

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const Avatar = ({ user, size = 36 }: AvatarProps) => {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#377DFF',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.36,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {getInitials(user.firstName, user.lastName)}
    </div>
  );
};

export default Avatar;
