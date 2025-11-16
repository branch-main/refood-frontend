export interface User {
  id: number;
  email: string;
  username?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  profile_picture?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
  name?: string;
  phone?: string;
}

export interface ProfileData {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  profile_picture?: string;
}
