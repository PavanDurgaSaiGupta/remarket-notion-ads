
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AdCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  imageUrl: string;
  isFavorite?: boolean;
  isSold?: boolean;
}

const AdCard = ({
  id,
  title,
  price,
  category,
  location,
  imageUrl,
  isFavorite = false,
  isSold = false,
}: AdCardProps) => {
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(isFavorite);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please login to add items to favorites");
      return;
    }
    
    setFavorite(!favorite);
    toast.success(favorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <Link to={`/ad/${id}`}>
      <Card className="overflow-hidden card-shadow transition-all duration-300 hover:animate-lift-up">
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="h-48 w-full object-cover"
          />
          
          {isSold && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-red-500 text-white px-3 py-1 text-sm">Sold</Badge>
            </div>
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              size={18}
              className={favorite ? "fill-remarket-secondary text-remarket-secondary" : "text-gray-500"}
            />
          </button>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
            <span className="font-bold text-remarket-dark">${price.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <Badge variant="outline" className="bg-remarket-muted">
              {category}
            </Badge>
            <span>{location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AdCard;
