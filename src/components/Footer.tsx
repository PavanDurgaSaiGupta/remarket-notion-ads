
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="text-remarket-DEFAULT">Re</span>
              <span className="text-remarket-secondary">Market</span>
            </h3>
            <p className="text-gray-600 text-sm">
              A modern marketplace to buy and sell items locally.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Electronics</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Furniture</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Clothing</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Vehicles</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="text-gray-600 hover:text-remarket-DEFAULT">Login</Link></li>
              <li><Link to="/signup" className="text-gray-600 hover:text-remarket-DEFAULT">Sign Up</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-remarket-DEFAULT">My Profile</Link></li>
              <li><Link to="/my-ads" className="text-gray-600 hover:text-remarket-DEFAULT">My Ads</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">FAQs</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-remarket-DEFAULT">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ReMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
