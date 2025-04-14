
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUserAds } from "@/lib/api";
import type { Ad } from "@/types";

const MyAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, this would come from auth context
  const currentUserId = "user1";

  useEffect(() => {
    const fetchUserAds = async () => {
      setIsLoading(true);
      try {
        const response = await getUserAds(currentUserId);
        if (response.data) {
          setAds(response.data);
        }
      } catch (error) {
        console.error("Error fetching user ads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAds();
  }, [currentUserId]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Ads</h1>
        <Button asChild>
          <Link to="/create-ad">Create New Ad</Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {ad.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={ad.imageUrl} 
                    alt={ad.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-1">{ad.title}</CardTitle>
                  <Badge>{ad.category}</Badge>
                </div>
                <p className="text-sm text-gray-500">{ad.location}</p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">${ad.price.toFixed(2)}</p>
                <p className="text-sm line-clamp-2 mt-2">{ad.description}</p>
                <div className="mt-3 text-xs text-gray-500">
                  Posted: {new Date(ad.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/ad/${ad.id}`}>View</Link>
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">You haven't posted any ads yet</h2>
          <p className="mb-6 text-gray-500">Create your first ad and start selling</p>
          <Button asChild>
            <Link to="/create-ad">Create Ad</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyAds;
