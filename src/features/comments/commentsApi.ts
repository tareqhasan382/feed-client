import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../shared/api/axiosInstance';
import type {
  Comment,
  Reply,
  GetCommentsResponse,
  GetRepliesResponse,
  CreateCommentResponse,
  CreateReplyResponse,
  CreateCommentRequest,
} from './commentTypes';
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

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Comments', 'Replies', 'Posts'],
  endpoints: (builder) => ({
    getComments: builder.query<GetCommentsResponse, { postId: string; cursor?: string | null; limit?: number }>({
      query: ({ postId, cursor, limit = 10 }) => ({
        url: `/posts/${postId}/comments`,
        method: 'GET',
        params: { ...(cursor && { cursor }), limit },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<Comment>>) => response.data,
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.postId}`,
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
      providesTags: (_result, _error, { postId }) => [{ type: 'Comments', id: postId }],
    }),

    getReplies: builder.query<GetRepliesResponse, { commentId: string; cursor?: string | null; limit?: number }>({
      query: ({ commentId, cursor, limit = 10 }) => ({
        url: `/comments/${commentId}/replies`,
        method: 'GET',
        params: { ...(cursor && { cursor }), limit },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<Reply>>) => response.data,
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.commentId}`,
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
      providesTags: (_result, _error, { commentId }) => [{ type: 'Replies', id: commentId }],
    }),

    createComment: builder.mutation<CreateCommentResponse, { postId: string } & CreateCommentRequest>({
      query: ({ postId, ...body }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<CreateCommentResponse>) => response.data,
      invalidatesTags: (_result, _error, { postId }) => [{ type: 'Comments', id: postId }],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            commentsApi.util.updateQueryData('getComments', { postId }, (draft) => {
              draft.items.unshift(created.comment);
            }),
          );
        } catch {
          dispatch(commentsApi.util.invalidateTags([{ type: 'Comments', id: postId }]));
        }
      },
    }),

    createReply: builder.mutation<CreateReplyResponse, { commentId: string; content: string }>({
      query: ({ commentId, ...body }) => ({
        url: `/comments/${commentId}/replies`,
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<CreateReplyResponse>) => response.data,
      invalidatesTags: (_result, _error, { commentId }) => [{ type: 'Replies', id: commentId }],
      onQueryStarted: async ({ commentId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            commentsApi.util.updateQueryData('getReplies', { commentId }, (draft) => {
              draft.items.unshift(created.reply);
            }),
          );
        } catch {
          dispatch(commentsApi.util.invalidateTags([{ type: 'Replies', id: commentId }]));
        }
      },
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetRepliesQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
} = commentsApi;
