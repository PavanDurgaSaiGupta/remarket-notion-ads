
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAds } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Camera, Loader2, Save, LogOut } from "lucide-react";
import { toast } from "sonner";
import AdCard from "@/components/AdCard";

const Profile = () => {
  const { user, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myAds, setMyAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setEmail(user.email || "");
    setName(user.name || "");
    setAvatar(user.avatar_url || null);

    // Fetch user's ads
    const fetchMyAds = async () => {
      setLoading(true);
      try {
        const ads = await getUserAds(user.id);
        setMyAds(ads);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user, navigate]);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, we would upload to Supabase storage
    // For this demo, we'll use a FileReader to create a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    toast.success("Profile picture updated");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      await updateProfile({ name, avatar_url: avatar || undefined });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <Button 
              variant="outline" 
              className="flex items-center text-red-500 border-red-200 hover:border-red-300 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="shadow-md bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative group">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatar || ""} />
                          <AvatarFallback className="bg-remarket-DEFAULT text-white text-xl">
                            {name ? name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        
                        <label className="absolute bottom-0 right-0 bg-remarket-DEFAULT text-white rounded-full p-2 cursor-pointer hover:bg-remarket-DEFAULT/90 transition-colors">
                          <Camera className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                        </label>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="form-input-visible"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            className="bg-gray-50 dark:bg-gray-700"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Email cannot be changed
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number"
                        className="form-input-visible"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Phone will only be shared with interested buyers when you choose to.
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="listings">
              <Card className="shadow-md bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>My Listings</CardTitle>
                </CardHeader>
                
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-remarket-DEFAULT" />
                    </div>
                  ) : myAds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myAds.map((ad) => (
                        <AdCard
                          key={ad.id}
                          id={ad.id}
                          title={ad.title}
                          price={ad.price}
                          category={ad.category}
                          location={ad.location}
                          imageUrl={ad.images[0]}
                          isSold={ad.is_sold}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">You don't have any listings yet</p>
                      <Button 
                        className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
                        onClick={() => navigate("/create-ad")}
                      >
                        Create Your First Ad
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
