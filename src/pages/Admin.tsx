
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';

// This is a simple hash function. In a real app, you'd use a proper crypto library
const hashPassword = (password: string) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
};

const Admin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // You should set your admin password here
  const setupAdminPassword = () => {
    const yourPassword = "YOUR_SECURE_PASSWORD"; // Replace this with your desired password
    localStorage.setItem('adminHash', hashPassword(yourPassword));
  };

  // Call this once to set up your password
  React.useEffect(() => {
    if (!localStorage.getItem('adminHash')) {
      setupAdminPassword();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedHash = localStorage.getItem('adminHash');
    
    if (hashPassword(password) === storedHash) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-lb-blue dark:text-lb-blue-light" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Enter your password to access the admin panel</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="Enter your admin password"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-lb-blue hover:bg-lb-blue-dark text-white dark:bg-lb-blue-light dark:hover:bg-lb-blue"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
