
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import Advertisement from '../common/Advertisement';
import { useTrendingArticles } from '@/hooks/useNewsData';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatRelativeTime } from '@/utils/formatDate';

const Sidebar: React.FC = () => {
  const { data: trendingArticles, isLoading } = useTrendingArticles();

  return (
    <aside className="space-y-8">
      <section>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
          Trending Now
        </h3>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {trendingArticles?.map((article, index) => (
              <Card key={article.id} className="news-card">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="text-2xl font-bold text-news-accent mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <Link 
                        to={article.path} 
                        className="font-medium hover:text-news-accent transition-colors"
                      >
                        {article.title}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatRelativeTime(article.date)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Advertisement type="square" />
      
      <section>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
          Subscribe
        </h3>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600 mb-4">
              Stay up to date with our daily briefings and in-depth analysis.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-news-primary"
              />
              <button
                type="submit"
                className="w-full bg-news-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
          Follow Us
        </h3>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full bg-news-primary flex items-center justify-center text-white">
            F
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-news-primary flex items-center justify-center text-white">
            T
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-news-primary flex items-center justify-center text-white">
            I
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-news-primary flex items-center justify-center text-white">
            Y
          </a>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
