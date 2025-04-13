
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ChevronLeft,
  MapPin,
  Calendar,
  User,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { getAdById, Ad } from "@/lib/api";

const AdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    const fetchAd = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const fetchedAd = await getAdById(id);
        setAd(fetchedAd);
        
        // Check if ad is in user's favorites (mock implementation)
        // In a real app, this would check against a favorites table in Supabase
        setIsFavorite(false);
      } catch (error) {
        console.error("Error fetching ad:", error);
        toast.error("Failed to load ad details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAd();
  }, [id]);
  
  const handleFavoriteToggle = () => {
    if (!user) {
      toast("Please login to save favorites");
      navigate("/login");
      return;
    }
    
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };
  
  const handleContactSeller = () => {
    if (!user) {
      toast("Please login to message sellers");
      navigate("/login");
      return;
    }
    
    // In a real app, this would open a chat modal or redirect to a chat page
    toast.success("Message feature coming soon!");
  };
  
  const handleShareAd = () => {
    // In a real app, this would use the Web Share API or copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12 flex-grow">
          <div className="flex justify-center items-center h-80">
            <Loader2 className="h-8 w-8 animate-spin text-remarket-DEFAULT" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!ad) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12 flex-grow">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Ad Not Found</h2>
            <p className="text-gray-600 mb-6">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
            >
              Back to Listings
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image Gallery - Left Column (3/5 on desktop) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={ad.images[selectedImage]}
                alt={ad.title}
                className="w-full h-96 object-contain"
              />
            </div>
            
            {ad.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {ad.images.map((image, index) => (
                  <div
                    key={index}
                    className={`h-20 w-20 rounded-md overflow-hidden cursor-pointer border-2 transition ${
                      selectedImage === index
                        ? "border-remarket-DEFAULT"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Ad Details - Right Column (2/5 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{ad.title}</h1>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={isFavorite ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
              
              <div className="flex items-center mt-2">
                <Badge className="bg-remarket-DEFAULT/20 text-remarket-DEFAULT hover:bg-remarket-DEFAULT/30 mr-2">
                  {ad.category}
                </Badge>
                {ad.is_sold && (
                  <Badge variant="destructive">Sold</Badge>
                )}
              </div>
              
              <p className="text-3xl font-bold text-remarket-DEFAULT mt-4">
                ${ad.price.toFixed(2)}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{ad.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted 2 days ago</span>
              </div>
              
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Seller: John Doe</span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">
                {ad.description || "No description provided for this listing."}
              </p>
            </div>
            
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
                onClick={handleContactSeller}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
              
              <Button variant="outline" onClick={handleShareAd}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Listing
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Seller Information</h2>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://randomuser.me/api/portraits/men/54.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-gray-600">Member since 2023</p>
              <p className="text-sm text-gray-500 mt-1">15 active listings</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdDetails;
