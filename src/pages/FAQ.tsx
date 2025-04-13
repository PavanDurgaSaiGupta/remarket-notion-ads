
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Find answers to the most common questions about ReMarket.</p>
          
          <Separator className="my-6" />
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="text-lg font-medium">How do I create an account?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                To create an account, click on the "Sign Up" button in the top right corner of the page. Fill in your details, and you're good to go!
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="text-lg font-medium">How do I post an ad?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                After logging in, click on the "Post Ad" button in the navigation menu. Fill in the details about your item, add photos, and submit your listing.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="text-lg font-medium">Is it free to list items?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                Yes, listing items on ReMarket is completely free! We want to make buying and selling as accessible as possible.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="text-lg font-medium">How do I contact a seller?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                When viewing an ad, click on the "Contact Seller" button to get in touch with the person selling the item. You can send them a message directly through our platform.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="text-lg font-medium">How do I edit or delete my listing?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                Go to "My Ads" in your profile menu. There, you'll find options to edit or delete each of your listings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
