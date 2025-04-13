
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

// Supabase client setup - we'll use environment variables in a real app
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Types
type User = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { name?: string; avatar_url?: string }) => Promise<void>;
}

// Creating the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // This is a mock implementation for now
  // In a real app, we would use the actual Supabase client
  useEffect(() => {
    // Mock a delay for authentication loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      // Mock implementation - would use supabase.auth.signUp in a real app
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, let's pretend signup worked
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account.",
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Mock implementation - would use supabase.auth.signInWithPassword in a real app
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, let's pretend login worked
      setUser({ id: '1', email: email });
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in.",
      });
    }
  };

  const signOut = async () => {
    try {
      // Mock implementation - would use supabase.auth.signOut in a real app
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out.",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Mock implementation - would use supabase.auth.resetPasswordForEmail in a real app
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send password reset email.",
      });
    }
  };

  const updateProfile = async (data: { name?: string; avatar_url?: string }) => {
    try {
      // Mock implementation - would update user profile in Supabase in a real app
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(user => user ? { ...user, ...data } : null);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile.",
      });
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
