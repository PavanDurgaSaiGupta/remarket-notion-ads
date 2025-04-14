
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFavoriteAds } from "@/lib/api";
import type { Ad } from "@/types";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const response = await getFavoriteAds();
        if (response.data) {
          setFavorites(response.data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((ad) => (
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
                <CardTitle className="line-clamp-1">{ad.title}</CardTitle>
                <p className="text-sm text-gray-500">{ad.location}</p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">${ad.price.toFixed(2)}</p>
                <p className="text-sm line-clamp-2 mt-2">{ad.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/ad/${ad.id}`}>View Details</Link>
                </Button>
                <Button variant="destructive" size="sm">
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="mb-6 text-gray-500">Start browsing and save ads to your favorites</p>
          <Button asChild>
            <Link to="/">Browse Listings</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
