
// Ad type definition
export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  imageUrl?: string; 
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}
