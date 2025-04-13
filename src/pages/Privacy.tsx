
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: April 13, 2025</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to ReMarket. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">2. The Data We Collect</h2>
              <p className="mb-4">
                Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
              </p>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Identity Data includes first name, last name, username or similar identifier.</li>
                <li className="mb-2">Contact Data includes email address and telephone numbers.</li>
                <li className="mb-2">Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li className="mb-2">Usage Data includes information about how you use our website, products and services.</li>
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li className="mb-2">Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li className="mb-2">Where we need to comply with a legal obligation.</li>
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">5. Your Legal Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@remarket.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
