import type { AuthorSummary, PaginatedResponse, PaginationParams } from '../../shared/types/common';

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: AuthorSummary;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
}

export interface Reply {
  id: string;
  content: string;
  createdAt: string;
  author: AuthorSummary;
  likeCount: number;
  isLiked: boolean;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  comment: Comment;
}

export interface CreateReplyResponse {
  reply: Reply;
}

export type GetCommentsResponse = PaginatedResponse<Comment>;
export type GetCommentsParams = PaginationParams & { postId: string };

export type GetRepliesResponse = PaginatedResponse<Reply>;
export type GetRepliesParams = PaginationParams & { commentId: string };
