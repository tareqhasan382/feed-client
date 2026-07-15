import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { useCallback } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '../features/auth/authApi';
import { setCredentials, clearAuth, setUser } from '../features/auth/authSlice';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginMutation({ email, password }).unwrap();
      dispatch(setCredentials(result));
      return result;
    },
    [loginMutation, dispatch],
  );

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) => {
      const result = await registerMutation({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      return result;
    },
    [registerMutation],
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(clearAuth());
    }
  }, [logoutMutation, dispatch]);

  const initializeUser = useCallback(
    (userData: { id: string; firstName: string; lastName: string; email: string; avatar: string | null }) => {
      dispatch(setUser(userData));
    },
    [dispatch],
  );

  return {
    user,
    isAuthenticated,
    isInitialized,
    isLoginLoading,
    isRegisterLoading,
    login,
    register,
    logout,
    initializeUser,
  };
};
