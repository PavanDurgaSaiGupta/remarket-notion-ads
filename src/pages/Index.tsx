
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AdCard from "@/components/AdCard";
import CategoryFilter from "@/components/CategoryFilter";
import SortFilter from "@/components/SortFilter";
import { getAds, Ad } from "@/lib/api";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  
  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const fetchedAds = await getAds({ category, sort });
        setAds(fetchedAds);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAds();
  }, [category, sort]);
  
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };
  
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {category ? `${category} Listings` : "All Listings"}
          </h2>
          <SortFilter onSortChange={handleSortChange} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-remarket-DEFAULT" />
          </div>
        ) : ads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-in">
            {ads.map((ad) => (
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
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No listings found</h3>
            <p className="text-gray-500">
              Try changing your search criteria or check back later for new listings.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
