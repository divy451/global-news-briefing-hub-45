
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Advertisement from '@/components/common/Advertisement';
import Sidebar from '@/components/news/Sidebar';
import { formatDate } from '@/utils/formatDate';
import { trendingArticles, featuredArticles, worldNews, technologyNews, businessNews, sportsNews } from '../data/mockData';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real application, we would fetch the article by slug from an API
  // For this demo, we'll just search for the article in our mock data
  const allArticles = [
    ...featuredArticles,
    ...worldNews,
    ...technologyNews,
    ...businessNews,
    ...sportsNews,
    ...trendingArticles
  ];
  
  const article = allArticles.find(article => {
    const articleSlug = article.path.split('/').pop();
    return articleSlug === slug;
  });
  
  if (!article) {
    return (
      <MainLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-news-accent hover:underline">Return to Homepage</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                <Link to={`/category/${article.category.toLowerCase()}`} className="text-news-accent hover:underline">
                  {article.category}
                </Link>
                {' · '}
                {formatDate(article.date)}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">{article.author}</div>
                  <div className="text-sm text-gray-500">Staff Writer</div>
                </div>
              </div>
            </header>
            
            <figure className="mb-8">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-500 mt-2">
                Photo: GlobalBrief
              </figcaption>
            </figure>
            
            <div className="prose max-w-none mb-8">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.</p>
              <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Key Developments</h2>
              
              <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.</p>
              
              <blockquote className="border-l-4 border-news-accent pl-4 italic my-6">
                This represents a significant shift in how we approach these challenges. The implications will be felt across multiple sectors for years to come.
              </blockquote>
              
              <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Looking Ahead</h2>
              
              <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.</p>
              <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.</p>
            </div>
            
            <Advertisement type="banner" />
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-[#1877f2] text-white rounded">Facebook</button>
                <button className="px-4 py-2 bg-[#1da1f2] text-white rounded">Twitter</button>
                <button className="px-4 py-2 bg-[#0a66c2] text-white rounded">LinkedIn</button>
                <button className="px-4 py-2 bg-[#25D366] text-white rounded">WhatsApp</button>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-4">Comments</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-center text-gray-600">
                  Comments are disabled for this article.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <Sidebar />
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default ArticlePage;
