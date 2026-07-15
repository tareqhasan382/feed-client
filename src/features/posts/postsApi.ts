import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../shared/api/axiosInstance';
import type { GetPostsResponse, CreatePostResponse, PostFeedItem } from './postTypes';
import type { PaginatedResponse } from '../../shared/types/common';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const axiosBaseQuery =
  () =>
  async (
    { url, method, data, params }: { url: string; method: string; data?: unknown; params?: Record<string, unknown> },
    _unknownArg: unknown,
    extraOptions: unknown,
  ) => {
    try {
      const result = await axiosInstance({ url, method, data, params, ...(extraOptions as Record<string, unknown>) });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as { response?: { data?: unknown; status?: number } };
      return { error: { status: err.response?.status, data: err.response?.data } };
    }
  };

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsResponse, { cursor?: string | null; limit?: number }>({
      query: ({ cursor, limit = 10 }) => ({
        url: '/posts',
        method: 'GET',
        params: { ...(cursor && { cursor }), limit },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<GetPostsResponse['items'][number]>>) => response.data,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.cursor) {
          currentCache.items.push(...newItems.items);
        } else {
          currentCache.items = newItems.items;
        }
        currentCache.nextCursor = newItems.nextCursor;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: (formData) => ({
        url: '/posts',
        method: 'POST',
        data: formData,
      }),
      transformResponse: (response: ApiResponse<CreatePostResponse>) => response.data,
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData('getPosts', { limit: 10 }, (draft) => {
              draft.items.unshift(created.post);
            }),
          );
        } catch {
          dispatch(postsApi.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]));
        }
      },
    }),

    updatePost: builder.mutation<{ post: PostFeedItem }, { postId: string; formData: FormData }>({
      query: ({ postId, formData }) => ({
        url: `/posts/${postId}`,
        method: 'PATCH',
        data: formData,
      }),
      transformResponse: (response: ApiResponse<{ post: PostFeedItem }>) => response.data,
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updated } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData('getPosts', { limit: 10 }, (draft) => {
              const idx = draft.items.findIndex((p) => p.id === postId);
              if (idx !== -1) {
                draft.items[idx] = { ...draft.items[idx], ...updated.post };
              }
            }),
          );
        } catch {
          dispatch(postsApi.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]));
        }
      },
    }),

    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (postId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', { limit: 10 }, (draft) => {
            draft.items = draft.items.filter((p) => p.id !== postId);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;
