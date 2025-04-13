
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Camera, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setEmail(user.email || "");
    setName(user.name || "");
    setAvatar(user.avatar_url || null);
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
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          
          <Card className="shadow-md">
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
                        {name ? name.charAt(0).toUpperCase() : "U"}
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
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">
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
                  />
                  <p className="text-xs text-gray-500">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
