
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: April 13, 2025</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to ReMarket. These terms and conditions outline the rules and regulations for the use of our website.
              </p>
              <p className="mb-4">
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use ReMarket if you do not accept all of the terms and conditions stated on this page.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">2. License to Use</h2>
              <p className="mb-4">
                Unless otherwise stated, ReMarket and/or its licensors own the intellectual property rights for all material on ReMarket. All intellectual property rights are reserved.
              </p>
              <p className="mb-4">
                You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">3. User Account</h2>
              <p className="mb-4">
                When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the website.
              </p>
              <p className="mb-4">
                You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">4. Listing and Buying</h2>
              <p className="mb-4">
                As a seller, you are responsible for the accuracy of your listings, including descriptions, prices, and images. All items must comply with our prohibited items policy.
              </p>
              <p className="mb-4">
                As a buyer, you are responsible for reading the full listing before making a purchase decision. When you agree to buy an item, you enter into a legally binding contract with the seller.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall ReMarket, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
              <p className="mb-4">
                ReMarket reserves the right to modify these terms from time to time at our sole discretion. Therefore, you should review these pages periodically. When we change the Terms in a material manner, we will notify you that material changes have been made to the Terms.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at terms@remarket.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
