
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { apiClient } from '@/hooks/useNewsData';
import { Article } from '@/types/news';

const EditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        // This would be an API call in production
        const allArticles = await apiClient.fetchCategoryArticles('all', 100);
        const foundArticle = allArticles.find(a => a.id === id);
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          toast({
            title: "Article not found",
            description: "The requested article could not be found",
            variant: "destructive"
          });
          navigate('/admin');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast({
          title: "Failed to load article",
          description: "An error occurred while loading the article",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate article update
    setTimeout(() => {
      toast({
        title: "Article updated",
        description: "Your article has been successfully updated.",
      });
      navigate('/admin');
      setIsSubmitting(false);
    }, 1000);
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

  if (!article) {
    return (
      <MainLayout>
        <div className="container py-12">
          <h1>Article not found</h1>
          <Link to="/admin">
            <Button className="mt-4">Back to Admin Portal</Button>
          </Link>
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
              <BreadcrumbLink asChild>
                <Link to="/admin">Admin Portal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Article</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Article</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                defaultValue={article.title} 
                required 
                className="focus:ring-red-600 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input 
                id="category" 
                defaultValue={article.category} 
                required 
                className="focus:ring-red-600 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
              <Textarea 
                id="excerpt" 
                defaultValue={article.excerpt} 
                required 
                className="focus:ring-red-600 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <Textarea 
                id="content" 
                defaultValue={article.content} 
                className="min-h-[200px] focus:ring-red-600 transition-all"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input 
                id="image" 
                defaultValue={article.image} 
                required 
                className="focus:ring-red-600 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">Author</label>
              <Input 
                id="author" 
                defaultValue={article.author} 
                required 
                className="focus:ring-red-600 transition-all"
              />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Article'}
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

export default EditArticle;
