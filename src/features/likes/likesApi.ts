import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../shared/api/axiosInstance';
import { postsApi } from '../posts/postsApi';
import { commentsApi } from '../comments/commentsApi';
import type {
  LikeUser,
  ToggleLikeResponse,
  GetPostLikesResponse,
  GetCommentLikesResponse,
} from './likeTypes';
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

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Posts', 'Comments', 'Replies'],
  endpoints: (builder) => ({
    togglePostLike: builder.mutation<ToggleLikeResponse, string>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<ToggleLikeResponse>) => response.data,
      onQueryStarted: async (postId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', { limit: 10 }, (draft) => {
            const post = draft.items.find((p) => p.id === postId);
            if (post) {
              post.isLiked = !post.isLiked;
              post.likeCount += post.isLiked ? 1 : -1;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleCommentLike: builder.mutation<ToggleLikeResponse, { commentId: string; postId?: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}/like`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<ToggleLikeResponse>) => response.data,
      onQueryStarted: async ({ commentId, postId }, { dispatch, queryFulfilled }) => {
        const patchComment = postId
          ? dispatch(
              commentsApi.util.updateQueryData('getComments', { postId }, (draft) => {
                const comment = draft.items.find((c) => c.id === commentId);
                if (comment) {
                  comment.isLiked = !comment.isLiked;
                  comment.likeCount += comment.isLiked ? 1 : -1;
                }
              }),
            )
          : null;

        const patchReply = postId
          ? dispatch(
              commentsApi.util.updateQueryData('getReplies', { commentId: postId }, (draft) => {
                const reply = draft.items.find((r) => r.id === commentId);
                if (reply) {
                  reply.isLiked = !reply.isLiked;
                  reply.likeCount += reply.isLiked ? 1 : -1;
                }
              }),
            )
          : null;

        try {
          await queryFulfilled;
        } catch {
          patchComment?.undo();
          patchReply?.undo();
        }
      },
    }),

    getPostLikes: builder.query<GetPostLikesResponse, { postId: string; cursor?: string | null; limit?: number }>({
      query: ({ postId, cursor, limit = 20 }) => ({
        url: `/posts/${postId}/likes`,
        method: 'GET',
        params: { ...(cursor && { cursor }), limit },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<LikeUser>>) => response.data,
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
    }),

    getCommentLikes: builder.query<GetCommentLikesResponse, { commentId: string; cursor?: string | null; limit?: number }>({
      query: ({ commentId, cursor, limit = 20 }) => ({
        url: `/comments/${commentId}/likes`,
        method: 'GET',
        params: { ...(cursor && { cursor }), limit },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<LikeUser>>) => response.data,
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
    }),
  }),
});

export const {
  useTogglePostLikeMutation,
  useToggleCommentLikeMutation,
  useGetPostLikesQuery,
  useGetCommentLikesQuery,
} = likesApi;
