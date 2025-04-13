
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Heart, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { getFavoriteAds, Ad } from "@/lib/api";

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast("Please login to view your favorites");
      return;
    }
    
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        // Pass the user ID to the getFavoriteAds function
        const favoriteAds = await getFavoriteAds(user.id);
        setFavorites(favoriteAds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user, navigate]);
  
  const handleRemoveFavorite = (adId: string) => {
    // In a real app, this would remove from Supabase
    toast.success("Removed from favorites");
    setFavorites(favorites.filter(ad => ad.id !== adId));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-remarket-DEFAULT" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(ad => (
              <div 
                key={ad.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div 
                  className="h-48 bg-gray-100 cursor-pointer relative"
                  onClick={() => navigate(`/ad/${ad.id}`)}
                >
                  {ad.images && ad.images.length > 0 ? (
                    <img 
                      src={ad.images[0]} 
                      alt={ad.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  
                  {ad.is_sold && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium">
                      SOLD
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 text-red-500 hover:bg-white/90 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(ad.id);
                    }}
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 
                    className="font-semibold text-lg mb-2 hover:text-remarket-DEFAULT cursor-pointer"
                    onClick={() => navigate(`/ad/${ad.id}`)}
                  >
                    {ad.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xl font-bold text-remarket-DEFAULT">
                      ${ad.price.toFixed(2)}
                    </p>
                    <Badge className="bg-remarket-DEFAULT/20 text-remarket-DEFAULT hover:bg-remarket-DEFAULT/30">
                      {ad.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {ad.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">
              Browse listings and click the heart icon to save your favorites.
            </p>
            <Button 
              className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
              onClick={() => navigate("/")}
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Listings
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
