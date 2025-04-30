
import React, { useState } from 'react';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const NewArticle: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate article creation
    setTimeout(() => {
      toast({
        title: "Article published",
        description: "Your new article has been successfully published.",
      });
      navigate('/admin');
      setIsSubmitting(false);
    }, 1000);
  };

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
              <BreadcrumbLink asChild>
                <Link to="/admin">Admin Portal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add New Article</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Article</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" placeholder="Article title" required className="focus:ring-red-600 transition-all" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input id="category" placeholder="Article category" required className="focus:ring-red-600 transition-all" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
              <Textarea id="excerpt" placeholder="Brief summary" required className="focus:ring-red-600 transition-all" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <Textarea id="content" placeholder="Article content" className="min-h-[200px] focus:ring-red-600 transition-all" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input id="image" placeholder="Image URL" required className="focus:ring-red-600 transition-all" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">Author</label>
              <Input id="author" placeholder="Author name" required className="focus:ring-red-600 transition-all" />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </Button>
              <Link to="/admin">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewArticle;
