
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdById, getUserById } from "@/lib/api";
import type { Ad, User } from "@/types";

const AdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const adResponse = await getAdById(id);
        
        if (adResponse.error || !adResponse.data) {
          setError(adResponse.error || "Ad not found");
          return;
        }
        
        setAd(adResponse.data);
        
        // Fetch seller info
        const sellerResponse = await getUserById(adResponse.data.userId);
        if (sellerResponse.data) {
          setSeller(sellerResponse.data);
        }
      } catch (err) {
        setError("An error occurred while fetching the ad details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || "Ad not found"}</h1>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <div className="md:flex">
          <div className="md:w-1/2">
            {ad.imageUrl ? (
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <CardHeader>
              <CardTitle className="text-2xl">{ad.title}</CardTitle>
              <CardDescription>{ad.category} • {ad.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">${ad.price.toFixed(2)}</p>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="mb-6">{ad.description}</p>
              
              {seller && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Seller Information</h3>
                  <div className="flex items-center">
                    {seller.avatarUrl && (
                      <img 
                        src={seller.avatarUrl} 
                        alt={seller.name}
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                    )}
                    <div>
                      <p className="font-medium">{seller.name}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to Listings
              </Button>
              <Button>Contact Seller</Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdDetails;
