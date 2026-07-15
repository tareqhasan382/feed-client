import type { PaginatedResponse, PaginationParams } from '../../shared/types/common';

export interface LikeUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
}

export interface ToggleLikeResponse {
  liked: boolean;
  likeCount: number;
}

export type GetPostLikesResponse = PaginatedResponse<LikeUser>;
export type GetPostLikesParams = PaginationParams & { postId: string };

export type GetCommentLikesResponse = PaginatedResponse<LikeUser>;
export type GetCommentLikesParams = PaginationParams & { commentId: string };
