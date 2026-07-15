import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../../features/auth/authApi';
import { useAppDispatch } from '../../hooks/useAuth';
import { setUser, clearAuth } from '../../features/auth/authSlice';
import { useAppSelector } from '../../hooks/useAuth';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const RouteGuard = ({ children, requireAuth = true }: RouteGuardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  const shouldFetchUser = requireAuth && isAuthenticated && !isInitialized;
  const { data, error } = useGetCurrentUserQuery(undefined, {
    skip: !shouldFetchUser,
  });

  useEffect(() => {
    if (shouldFetchUser && data) {
      dispatch(setUser(data));
    }
    if (shouldFetchUser && error) {
      dispatch(clearAuth());
    }
  }, [shouldFetchUser, data, error, dispatch]);

  useEffect(() => {
    if (!isInitialized) return;

    if (requireAuth && !isAuthenticated) {
      navigate('/login', { replace: true });
    }

    if (!requireAuth && isAuthenticated) {
      navigate('/feed', { replace: true });
    }
  }, [isAuthenticated, isInitialized, requireAuth, navigate]);

  if (requireAuth && !isInitialized) {
    return (
      <div className="container py-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
