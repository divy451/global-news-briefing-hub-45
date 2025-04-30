
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BreakingNewsProps {
  news: {
    id: string;
    title: string;
    path: string;
  }[];
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
        setIsAnimating(false);
      }, 500); // Match this with the duration of the fade-out animation
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="bg-news-accent text-white py-2 px-4">
      <div className="container">
        <div className="flex items-center">
          <div className="font-bold mr-3 whitespace-nowrap">BREAKING:</div>
          <div className="overflow-hidden flex-1">
            <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <Link to={news[currentIndex].path} className="hover:underline inline-block">
                {news[currentIndex].title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
