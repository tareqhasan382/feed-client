import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UserResponse,
} from './authTypes';
import axiosInstance from '../../shared/api/axiosInstance';
import { tokenStorage } from '../../shared/utils/tokenStorage';
import type { RootState } from '../../app/store';

const axiosBaseQuery =
  () =>
  async (
    {
      url,
      method,
      data,
    }: { url: string; method: string; data?: unknown },
    _unknownArg: unknown,
    extraOptions: unknown,
  ) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        ...(extraOptions as Record<string, unknown>),
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as { response?: { data?: unknown; status?: number } };
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        data,
      }),
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(authApi.util.resetApiState());
          tokenStorage.clear();
        }
      },
    }),

    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;

export const selectCurrentUser = (state: RootState) => state.auth.user;
