
import React from 'react';
import NewsCard from './NewsCard';

interface FeaturedNewsProps {
  mainArticle: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    path: string;
  };
  secondaryArticles: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    path: string;
  }[];
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ mainArticle, secondaryArticles }) => {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
          Featured News
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NewsCard 
              {...mainArticle}
              featured={true}
            />
          </div>
          
          <div className="space-y-6">
            {secondaryArticles.map((article) => (
              <NewsCard 
                key={article.id}
                {...article}
                horizontal={true}
                compact={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
