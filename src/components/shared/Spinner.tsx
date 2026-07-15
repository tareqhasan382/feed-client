interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 24 }: SpinnerProps) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}>
    <div
      style={{
        width: size,
        height: size,
        border: '3px solid #eee',
        borderTopColor: '#377DFF',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner;
