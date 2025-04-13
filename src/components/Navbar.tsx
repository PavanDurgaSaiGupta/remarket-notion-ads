
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Plus, Heart, User, LogOut, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Set searchTerm from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("You have been logged out");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="border-b border-remarket-card-border dark:border-remarket-dark-card-border bg-white dark:bg-remarket-dark-card-bg py-4 px-6 sticky top-0 z-10 shadow-sm animate-fade-in">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-remarket">Re</span>
              <span className="text-remarket-secondary">Market</span>
            </h1>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-remarket-text-secondary dark:text-remarket-dark-text-secondary" />
            <Input
              type="text"
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-remarket-dark-card-bg border-remarket-card-border dark:border-remarket-dark-card-border text-remarket-dark dark:text-remarket-dark-text"
            />
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="dark-mode-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

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
                      <AvatarFallback className="bg-remarket text-remarket-text-on-primary">
                        {user.email?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="font-medium bg-white dark:bg-remarket-dark-card-bg">
                  <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-ads" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" /> My Ads
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
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
                <Button className="bg-remarket hover:bg-remarket/90 font-medium" size="sm">
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
