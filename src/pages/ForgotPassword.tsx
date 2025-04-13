
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Loader2, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during password reset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6 animate-fade-in">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-lg font-medium">Check your email</h3>
                <p className="text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <div className="pt-4">
                  <Link to="/login">
                    <Button className="w-full bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-remarket-DEFAULT hover:bg-remarket-DEFAULT/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
                
                <div className="text-center text-sm">
                  <Link to="/login" className="text-remarket-DEFAULT hover:underline">
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
