
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Plus, Heart, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="border-b bg-white py-4 px-6 sticky top-0 z-10 shadow-sm animate-fade-in">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-remarket">
              <span className="text-remarket-DEFAULT">Re</span>
              <span className="text-remarket-secondary">Market</span>
            </h1>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </form>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/create-ad">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 font-medium">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Post Ad</span>
                </Button>
              </Link>
              <Link to="/favorites">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 font-medium">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Favorites</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ""} />
                      <AvatarFallback className="bg-remarket-DEFAULT text-white">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="font-medium">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-ads" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" /> My Ads
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90 font-medium" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
