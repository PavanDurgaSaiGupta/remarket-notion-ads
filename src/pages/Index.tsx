
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllAds } from "@/lib/api";
import type { Ad } from "@/types";

const Index = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const response = await getAllAds();
        if (response.data) {
          setAds(response.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Featured Ads</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {ad.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{ad.title}</CardTitle>
                  <CardDescription>{ad.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{ad.description}</p>
                  <p className="mt-4 text-xl font-bold">${ad.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button variant="secondary">Contact Seller</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
