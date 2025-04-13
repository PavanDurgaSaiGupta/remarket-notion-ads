import { supabase } from "@/integrations/supabase/client";
import { Ad } from "@/types";

// Mock data - replace with Supabase later
let mockAds: Ad[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    description: "Classic leather jacket in excellent condition.",
    price: 120,
    location: "Los Angeles, CA",
    category: "Clothing",
    user_id: "user123",
    created_at: "2024-01-25T12:00:00Z",
    images: [
      "https://images.unsplash.com/photo-1588075592492-8ca89c43a399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    is_sold: false,
  },
  {
    id: "2",
    title: "Antique Wooden Chair",
    description: "Beautifully carved wooden chair from the 1920s.",
    price: 250,
    location: "New York, NY",
    category: "Furniture",
    user_id: "user456",
    created_at: "2024-01-24T18:30:00Z",
    images: [
      "https://images.unsplash.com/photo-1532499664714-2996077bc30d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    is_sold: false,
  },
  {
    id: "3",
    title: "Samsung 4K Smart TV",
    description: "Like new, 55-inch 4K Smart TV with HDR.",
    price: 400,
    location: "Chicago, IL",
    category: "Electronics",
    user_id: "user789",
    created_at: "2024-01-23T09:15:00Z",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    is_sold: false,
  },
];

// Create image URL for Supabase storage
export const getImageUrl = (bucketName: string, path: string) => {
  return `${supabase.storage.from(bucketName).getPublicUrl(path).data.publicUrl}`;
};

// Upload image to Supabase storage
export const uploadImage = async (file: File, bucketName: string = 'ad-images'): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { error } = await supabase.storage.from(bucketName).upload(filePath, file);
    
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    
    return getImageUrl(bucketName, filePath);
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
};

interface GetAdsParams {
  category?: string;
  sort?: string;
  search?: string;
}

export const getAds = async (params: GetAdsParams = {}): Promise<Ad[]> => {
  let filteredAds = [...mockAds];
  
  if (params.category) {
    filteredAds = filteredAds.filter(ad =>
      ad.category.toLowerCase() === params.category?.toLowerCase()
    );
  }
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredAds = filteredAds.filter(ad =>
      ad.title.toLowerCase().includes(searchTerm) ||
      ad.description.toLowerCase().includes(searchTerm) ||
      ad.location.toLowerCase().includes(searchTerm)
    );
  }
  
  if (params.sort === "price-asc") {
    filteredAds.sort((a, b) => a.price - b.price);
  } else if (params.sort === "price-desc") {
    filteredAds.sort((a, b) => b.price - a.price);
  } else {
    // Default to newest
    filteredAds.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  
  return filteredAds;
};

export const getAd = async (id: string): Promise<Ad | undefined> => {
  return mockAds.find((ad) => ad.id === id);
};

export const getUserAds = async (userId: string): Promise<Ad[]> => {
  return mockAds.filter((ad) => ad.user_id === userId);
};

// Create ad with uploaded images
export const createAd = async (adData: Partial<Ad>, user: any) => {
  // Simulate creating an ad with the provided data
  // In a real app, this would be a call to Supabase
  const newAd: Ad = {
    id: Math.random().toString(36).substring(2, 15),
    title: adData.title || 'Untitled',
    description: adData.description || '',
    price: adData.price || 0,
    location: adData.location || '',
    category: adData.category || 'Other',
    user_id: user?.id || 'anonymous',
    created_at: new Date().toISOString(),
    images: adData.images || [],
    is_sold: false,
  };
  
  // Add the new ad to our mock database
  mockAds.unshift(newAd);
  
  return newAd;
};
