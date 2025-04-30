
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from '../common/LoadingSpinner';

const AdminRouteGuard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem('admin_token');
    
    if (token === 'admin_authenticated') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast({
        title: "Authentication required",
        description: "Please log in to access the admin area",
      });
    }
  }, [toast]);

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRouteGuard;
