
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNewsData } from '@/hooks/useNewsData';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from "@/components/ui/use-toast";

const AdminPortal: React.FC = () => {
  const { data: articles, isLoading } = useNewsData();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication on component mount
    const token = localStorage.getItem('admin_token');
    if (token !== 'admin_authenticated') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleDelete = (id: string) => {
    toast({
      title: "Article deleted",
      description: "The article was successfully deleted",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-12">
          <LoadingSpinner />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Admin Portal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Content Management</h1>
          <div className="flex space-x-4">
            <Link to="/admin/new">
              <Button className="bg-red-600 hover:bg-red-700">Add New Article</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles?.map((article) => (
                <TableRow key={article.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link to={`/admin/edit/${article.id}`}>
                      <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors">Edit</Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="bg-red-600 hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPortal;
