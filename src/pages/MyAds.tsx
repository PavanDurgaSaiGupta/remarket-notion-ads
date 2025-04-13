
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Plus, Pencil, Trash2, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { getMyAds, Ad } from "@/lib/api";

const MyAds = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activeAds, setActiveAds] = useState<Ad[]>([]);
  const [soldAds, setSoldAds] = useState<Ad[]>([]);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast("Please login to view your ads");
      return;
    }
    
    const fetchMyAds = async () => {
      setLoading(true);
      try {
        const myAds = await getMyAds();
        setActiveAds(myAds.filter(ad => !ad.is_sold));
        setSoldAds(myAds.filter(ad => ad.is_sold));
      } catch (error) {
        console.error("Error fetching my ads:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyAds();
  }, [user, navigate]);
  
  const handleCreateAd = () => {
    navigate("/create-ad");
  };
  
  const handleEditAd = (adId: string) => {
    // In a real app, this would navigate to an edit page
    toast.success("Edit feature coming soon!");
  };
  
  const handleDeleteAd = (adId: string) => {
    // In a real app, this would delete the ad from Supabase
    toast.success("Ad deleted successfully");
    setActiveAds(activeAds.filter(ad => ad.id !== adId));
  };
  
  const handleMarkAsSold = (adId: string) => {
    // In a real app, this would update the ad in Supabase
    toast.success("Ad marked as sold");
    const adToUpdate = activeAds.find(ad => ad.id === adId);
    if (adToUpdate) {
      // Remove from active
      setActiveAds(activeAds.filter(ad => ad.id !== adId));
      // Add to sold
      setSoldAds([...soldAds, { ...adToUpdate, is_sold: true }]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Listings</h1>
          
          <Button 
            className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
            onClick={handleCreateAd}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Ad
          </Button>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">
              Active Listings ({activeAds.length})
            </TabsTrigger>
            <TabsTrigger value="sold">
              Sold Items ({soldAds.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-remarket-DEFAULT" />
              </div>
            ) : activeAds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeAds.map(ad => (
                  <Card key={ad.id} className="overflow-hidden">
                    <div 
                      className="h-48 bg-gray-100 cursor-pointer" 
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
                    </div>
                    
                    <CardHeader className="p-4 pb-2">
                      <CardTitle 
                        className="text-lg cursor-pointer hover:text-remarket-DEFAULT transition-colors"
                        onClick={() => navigate(`/ad/${ad.id}`)}
                      >
                        {ad.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0">
                      <p className="text-xl font-bold text-remarket-DEFAULT">
                        ${ad.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {ad.location} • Posted 2 days ago
                      </p>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-gray-600"
                        onClick={() => handleEditAd(ad.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteAd(ad.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleMarkAsSold(ad.id)}
                      >
                        <CheckSquare className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">You don't have any active listings</h3>
                <p className="text-gray-500 mb-6">
                  Start selling your items by creating your first ad.
                </p>
                <Button 
                  className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
                  onClick={handleCreateAd}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Ad
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sold">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-remarket-DEFAULT" />
              </div>
            ) : soldAds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldAds.map(ad => (
                  <Card key={ad.id} className="overflow-hidden opacity-75">
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
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium">
                        SOLD
                      </div>
                    </div>
                    
                    <CardHeader className="p-4 pb-2">
                      <CardTitle 
                        className="text-lg cursor-pointer hover:text-remarket-DEFAULT transition-colors"
                        onClick={() => navigate(`/ad/${ad.id}`)}
                      >
                        {ad.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0">
                      <p className="text-xl font-bold text-remarket-DEFAULT">
                        ${ad.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {ad.location} • Sold 1 day ago
                      </p>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 w-full"
                        onClick={() => handleDeleteAd(ad.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No sold items yet</h3>
                <p className="text-gray-500">
                  Items you mark as sold will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAds;
