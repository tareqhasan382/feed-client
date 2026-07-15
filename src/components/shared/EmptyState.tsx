interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = 'No items to show' }: EmptyStateProps) => (
  <div style={{ textAlign: 'center', padding: '40px 16px', color: '#999' }}>
    <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
  </div>
);

export default EmptyState;
