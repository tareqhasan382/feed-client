export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse extends AuthTokens {}

export interface UserResponse extends User {}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}
