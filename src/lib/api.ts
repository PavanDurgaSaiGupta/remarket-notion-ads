
// Mock data for ads

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  seller_id: string;
  seller_name: string;
  seller_avatar?: string;
  seller_phone?: string;
  created_at: string;
  images: string[];
  is_sold: boolean;
}

// Mock data
const mockAds: Ad[] = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - Excellent Condition",
    description: "Selling my iPhone 13 Pro Max (256GB) in excellent condition. Comes with original box, charger, and a case. No scratches or dents.",
    price: 799,
    category: "Electronics",
    location: "New York, NY",
    seller_id: "user1",
    seller_name: "John Doe",
    seller_avatar: "https://i.pravatar.cc/150?img=1",
    seller_phone: "+1234567890",
    created_at: "2023-04-01T10:30:00Z",
    images: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1065&auto=format&fit=crop",
    ],
    is_sold: false,
  },
  {
    id: "2",
    title: "Modern Sofa - Like New",
    description: "Beautiful modern sofa in great condition. Only used for a few months. Moving to a new place and need to sell.",
    price: 450,
    category: "Furniture",
    location: "Los Angeles, CA",
    seller_id: "user2",
    seller_name: "Jane Smith",
    seller_avatar: "https://i.pravatar.cc/150?img=2",
    seller_phone: "+1987654321",
    created_at: "2023-04-02T14:20:00Z",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1740&auto=format&fit=crop",
    ],
    is_sold: false,
  },
  {
    id: "3",
    title: "Mountain Bike - Trek Marlin 7",
    description: "Selling my Trek Marlin 7 mountain bike. In great condition, recently serviced. Perfect for trails and city riding.",
    price: 650,
    category: "Sports",
    location: "Denver, CO",
    seller_id: "user3",
    seller_name: "Mike Johnson",
    seller_avatar: "https://i.pravatar.cc/150?img=3",
    seller_phone: "+1122334455",
    created_at: "2023-04-03T09:15:00Z",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1506&auto=format&fit=crop",
    ],
    is_sold: false,
  },
  {
    id: "4",
    title: "DSLR Camera - Canon EOS 5D Mark IV",
    description: "Professional Canon EOS 5D Mark IV with 24-70mm lens. Includes extra battery, memory cards, and camera bag.",
    price: 1900,
    category: "Electronics",
    location: "Chicago, IL",
    seller_id: "user4",
    seller_name: "Lisa Williams",
    seller_avatar: "https://i.pravatar.cc/150?img=4",
    seller_phone: "+1554433221",
    created_at: "2023-04-04T16:45:00Z",
    images: [
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=1740&auto=format&fit=crop",
    ],
    is_sold: false,
  },
  {
    id: "5",
    title: "Vintage Leather Jacket",
    description: "Genuine leather vintage jacket in brown. Size M, barely worn, excellent condition.",
    price: 200,
    category: "Clothing",
    location: "Seattle, WA",
    seller_id: "user5",
    seller_name: "Tom Davis",
    seller_avatar: "https://i.pravatar.cc/150?img=5",
    seller_phone: "+1778899001",
    created_at: "2023-04-05T11:30:00Z",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1635&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579639782539-15cc6c7a4a91?q=80&w=1739&auto=format&fit=crop",
    ],
    is_sold: true,
  },
  {
    id: "6",
    title: "2018 Honda Civic - Low Mileage",
    description: "2018 Honda Civic EX with only 35,000 miles. One owner, clean title, no accidents. Regular maintenance, excellent condition.",
    price: 17500,
    category: "Vehicles",
    location: "Austin, TX",
    seller_id: "user6",
    seller_name: "Bob Miller",
    seller_avatar: "https://i.pravatar.cc/150?img=6",
    seller_phone: "+1223344556",
    created_at: "2023-04-06T13:20:00Z",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=1513&auto=format&fit=crop",
    ],
    is_sold: false,
  },
];

// Mock API functions
export const getAds = async (params: {
  category?: string;
  sort?: string;
}): Promise<Ad[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
  
  let filteredAds = [...mockAds];
  
  // Filter by category
  if (params.category) {
    filteredAds = filteredAds.filter(ad => ad.category === params.category);
  }
  
  // Sort ads
  if (params.sort) {
    switch (params.sort) {
      case "newest":
        filteredAds.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        filteredAds.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "price_low":
        filteredAds.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filteredAds.sort((a, b) => b.price - a.price);
        break;
    }
  }
  
  return filteredAds;
};

export const getAdById = async (id: string): Promise<Ad | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  
  const ad = mockAds.find(ad => ad.id === id);
  return ad || null;
};

export const getUserAds = async (userId: string): Promise<Ad[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
  
  return mockAds.filter(ad => ad.seller_id === userId);
};

export const getFavoriteAds = async (userId: string): Promise<Ad[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
  
  // For this mock, we'll just return a subset of the ads as favorites
  return mockAds.slice(0, 3);
};

export const createAd = async (adData: Partial<Ad>): Promise<Ad> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  
  // Create a new ad with mock data
  const newAd: Ad = {
    id: `ad-${Date.now()}`,
    title: adData.title || "Untitled Ad",
    description: adData.description || "",
    price: adData.price || 0,
    category: adData.category || "Others",
    location: adData.location || "Unknown",
    seller_id: adData.seller_id || "current-user",
    seller_name: "Current User",
    created_at: new Date().toISOString(),
    images: adData.images || [],
    is_sold: false,
  };
  
  // In a real app, we would save this to Supabase
  return newAd;
};
