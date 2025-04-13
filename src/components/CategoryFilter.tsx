
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Clothing",
  "Vehicles",
  "Real Estate",
  "Services",
  "Jobs",
  "Others",
];

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category === "All" ? "" : category);
  };

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap mb-4 bg-gray-100 p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex-shrink-0 ${
                activeCategory === category
                  ? "bg-white shadow-sm font-medium"
                  : "text-gray-600"
              }`}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryFilter;
