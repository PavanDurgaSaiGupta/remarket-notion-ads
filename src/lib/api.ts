
import { Ad, ApiResponse, User } from "@/types";

// Mock data for demonstration
const mockAds: Ad[] = [
  {
    id: "1",
    title: "iPhone 12 Pro Max",
    description: "Excellent condition, barely used. Comes with original accessories.",
    price: 799,
    category: "Electronics",
    location: "New York, NY",
    imageUrl: "https://placehold.co/600x400/6B7FDB/FFFFFF?text=iPhone+12",
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Desk Chair",
    description: "Ergonomic office chair, adjustable height and armrests.",
    price: 129,
    category: "Furniture",
    location: "San Francisco, CA",
    imageUrl: "https://placehold.co/600x400/4CCEAC/FFFFFF?text=Desk+Chair",
    userId: "user2",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "3",
    title: "Mountain Bike",
    description: "21-speed mountain bike, front suspension, great for trails.",
    price: 349,
    category: "Sports",
    location: "Denver, CO",
    imageUrl: "https://placehold.co/600x400/FF758F/FFFFFF?text=Mountain+Bike",
    userId: "user1",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const mockUsers: User[] = [
  {
    id: "user1",
    email: "user1@example.com",
    name: "John Doe",
    avatarUrl: "https://placehold.co/200x200/6B7FDB/FFFFFF?text=JD"
  },
  {
    id: "user2",
    email: "user2@example.com",
    name: "Jane Smith",
    avatarUrl: "https://placehold.co/200x200/FF758F/FFFFFF?text=JS"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all ads
export const getAllAds = async (): Promise<ApiResponse<Ad[]>> => {
  await delay(800);
  return { data: mockAds, error: null };
};

// Get ad by ID
export const getAdById = async (id: string): Promise<ApiResponse<Ad | null>> => {
  await delay(500);
  const ad = mockAds.find(ad => ad.id === id);
  return { data: ad || null, error: ad ? null : "Ad not found" };
};

// Get user's ads
export const getUserAds = async (userId: string): Promise<ApiResponse<Ad[]>> => {
  await delay(600);
  const userAds = mockAds.filter(ad => ad.userId === userId);
  return { data: userAds, error: null };
};

// Get user's favorite ads (mock implementation)
export const getFavoriteAds = async (): Promise<ApiResponse<Ad[]>> => {
  await delay(700);
  // For demo, return a subset of ads as favorites
  return { data: [mockAds[0], mockAds[2]], error: null };
};

// Get user by ID
export const getUserById = async (id: string): Promise<ApiResponse<User | null>> => {
  await delay(400);
  const user = mockUsers.find(user => user.id === id);
  return { data: user || null, error: user ? null : "User not found" };
};

// Create a new ad
export const createAd = async (adData: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Ad>> => {
  await delay(1000);
  const newAd: Ad = {
    ...adData,
    id: `ad${mockAds.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, we would save this to a database
  mockAds.push(newAd);
  
  return { data: newAd, error: null };
};

// Re-export the Ad type so it can be imported from api.ts
export type { Ad, User };
