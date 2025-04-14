
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Home, LogIn, LogOut, PlusCircle, User } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#6b7fdb] to-[#4cceac] py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <Home className="mr-2" size={24} />
          REMARKET
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="secondary" asChild>
                <Link to="/post-ad">
                  <PlusCircle className="mr-2" size={16} />
                  Post Ad
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/profile">
                  <User className="mr-2" size={16} />
                  Profile
                </Link>
              </Button>
              
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="mr-2" size={16} />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">
                  <LogIn className="mr-2" size={16} />
                  Login
                </Link>
              </Button>
              
              <Button variant="secondary" asChild>
                <Link to="/register">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
