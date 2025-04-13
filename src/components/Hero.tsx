
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="gradient-bg text-white py-16 px-6 animate-fade-in">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Buy and sell items with your community
          </h1>
          <p className="text-lg opacity-90">
            ReMarket is the easiest way to buy and sell locally. Find great deals or make some extra cash by selling what you don't use anymore.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/create-ad">
              <Button className="bg-white text-remarket-DEFAULT hover:bg-gray-100 rounded-full px-8">
                Post an Ad <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-8">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="hidden md:block">
          <img
            src="/lovable-uploads/c7463edf-8744-45b7-ab7e-268b7f699f84.png"
            alt="ReMarket Illustration"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
