
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="text-remarket-DEFAULT">Re</span>
              <span className="text-remarket-secondary">Market</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A modern marketplace to buy and sell items locally.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-remarket-dark dark:text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/?category=electronics" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Electronics</Link></li>
              <li><Link to="/?category=furniture" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Furniture</Link></li>
              <li><Link to="/?category=clothing" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Clothing</Link></li>
              <li><Link to="/?category=vehicles" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Vehicles</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-remarket-dark dark:text-white">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Login</Link></li>
              <li><Link to="/signup" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Sign Up</Link></li>
              <li><Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">My Profile</Link></li>
              <li><Link to="/my-ads" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">My Ads</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-remarket-dark dark:text-white">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-remarket-DEFAULT">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ReMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
