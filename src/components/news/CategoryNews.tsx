
import React from 'react';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';

interface CategoryNewsProps {
  category: {
    name: string;
    path: string;
  };
  articles: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    path: string;
  }[];
}

const CategoryNews: React.FC<CategoryNewsProps> = ({ category, articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold relative">
            {category.name}
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-red-600"></span>
          </h2>
          <Link 
            to={category.path} 
            className="text-red-600 hover:underline font-medium transition-all duration-300 hover:text-red-700 hover:translate-x-1"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div 
              key={article.id}
              className="animate-slide-in-bottom hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <NewsCard 
                {...article}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNews;
