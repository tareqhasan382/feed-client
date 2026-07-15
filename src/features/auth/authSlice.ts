import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from './authTypes';
import { tokenStorage } from '../../shared/utils/tokenStorage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const getInitialState = (): AuthState => {
  const hasAccessToken = !!tokenStorage.getAccessToken();
  const hasRefreshToken = !!tokenStorage.getRefreshToken();

  if (hasAccessToken && hasRefreshToken) {
    return {
      user: null,
      isAuthenticated: true,
      isInitialized: false,
    };
  }

  return {
    user: null,
    isAuthenticated: false,
    isInitialized: true,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isInitialized = true;

      tokenStorage.setAccessToken(action.payload.accessToken);
      tokenStorage.setRefreshToken(action.payload.refreshToken);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isInitialized = true;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;

      tokenStorage.clear();
    },

    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setCredentials, setUser, clearAuth, setInitialized } =
  authSlice.actions;

export default authSlice.reducer;
