
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { UploadCloud, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { createAd, uploadImage } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";

const CreateAd = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to create an ad");
      navigate("/login");
    }
  }, [user, navigate]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Limit to 5 images max
    if (images.length + files.length > 5) {
      toast.warning("You can upload a maximum of 5 images");
      return;
    }
    
    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
    
    // Create URLs for preview
    const newImageUrls = newImages.map(file => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...newImageUrls]);
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newImageUrls = [...imageUrls];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index]);
    
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    
    setImages(newImages);
    setImageUrls(newImageUrls);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !price || !category || !location) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (parseFloat(price) <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }
    
    setIsSubmitting(true);
    setIsUploading(true);
    
    try {
      // Upload images to Supabase storage
      const uploadedImageUrls: string[] = [];
      
      if (images.length > 0) {
        for (const image of images) {
          const imageUrl = await uploadImage(image);
          if (imageUrl) {
            uploadedImageUrls.push(imageUrl);
          }
        }
      }
      
      setIsUploading(false);
      
      const adData = {
        title,
        description,
        price: parseFloat(price),
        category,
        location,
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : imageUrls, // Fall back to local URLs for preview
      };
      
      // Create the ad
      const newAd = await createAd(adData, user);
      
      toast.success("Ad created successfully!");
      navigate(`/ad/${newAd.id}`);
    } catch (error) {
      console.error("Error creating ad:", error);
      toast.error("Failed to create ad. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };
  
  // Cleanup image URLs on unmount
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
          
          <Card className="shadow-md bg-white dark:bg-remarket-dark-card-bg">
            <CardHeader>
              <CardTitle>Ad Details</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. iPhone 14 Pro Max - Excellent Condition"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input-visible"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail. Include condition, age, brand, etc."
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input-visible"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price * ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      required
                      min="0.01"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-input-visible"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={setCategory} value={category}>
                      <SelectTrigger className="form-input-visible">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Vehicles">Vehicles</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Sports">Sports & Outdoors</SelectItem>
                        <SelectItem value="Toys">Toys & Games</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Los Angeles, CA"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-input-visible"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="border-2 border-dashed border-remarket-card-border dark:border-remarket-dark-card-border rounded-lg p-6 text-center">
                    <UploadCloud className="h-8 w-8 mx-auto mb-2 text-remarket-text-secondary dark:text-remarket-dark-text-secondary" />
                    <p className="text-remarket-text-secondary dark:text-remarket-dark-text-secondary mb-2">Drag and drop images here, or click to browse</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="bg-white dark:bg-remarket-dark-card-bg"
                    >
                      Select Images
                    </Button>
                    
                    {imageUrls.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative h-24 bg-gray-50 dark:bg-remarket-dark-bg rounded overflow-hidden">
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 p-1 rounded-full bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black transition-colors"
                              onClick={() => removeImage(index)}
                            >
                              <XCircle className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-remarket-text-secondary dark:text-remarket-dark-text-secondary">
                    You can upload up to 5 images. First image will be the cover.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-remarket hover:bg-remarket/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isUploading ? "Uploading images..." : "Creating your ad..."}
                      </>
                    ) : (
                      "Create Ad"
                    )}
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

export default CreateAd;
