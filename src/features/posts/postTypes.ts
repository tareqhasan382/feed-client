import type { AuthorSummary, PaginatedResponse, PaginationParams } from '../../shared/types/common';

export interface PostFeedItem {
  id: string;
  content: string;
  imageUrl?: string | null;
  visibility: 'PUBLIC' | 'PRIVATE';
  createdAt: string;
  authorId: string;
  author: AuthorSummary;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  recentLikers: AuthorSummary[];
}

export type PostDetail = PostFeedItem;

export interface CreatePostRequest {
  content: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  image?: File | null;
}

export interface CreatePostResponse {
  post: PostDetail;
}

export type GetPostsResponse = PaginatedResponse<PostFeedItem>;
export type GetPostsParams = PaginationParams;
