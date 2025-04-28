
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BreakingNews from '@/components/news/BreakingNews';
import FeaturedNews from '@/components/news/FeaturedNews';
import CategoryNews from '@/components/news/CategoryNews';
import Advertisement from '@/components/common/Advertisement';
import Sidebar from '@/components/news/Sidebar';
import { 
  useBreakingNews, 
  useFeaturedArticles, 
  useCategoryArticles 
} from '@/hooks/useNewsData';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Index: React.FC = () => {
  const { data: breakingNewsData, isLoading: isLoadingBreaking } = useBreakingNews();
  const { data: featuredArticlesData, isLoading: isLoadingFeatured } = useFeaturedArticles();
  
  const { data: worldNewsData } = useCategoryArticles('World');
  const { data: technologyNewsData } = useCategoryArticles('Technology');
  const { data: businessNewsData } = useCategoryArticles('Business');
  const { data: sportsNewsData } = useCategoryArticles('Sports');

  return (
    <MainLayout>
      {/* Breaking News Banner */}
      {isLoadingBreaking ? null : breakingNewsData && (
        <BreakingNews news={breakingNewsData} />
      )}
      
      <div className="container py-8">
        {/* Featured News Section */}
        {isLoadingFeatured ? (
          <LoadingSpinner />
        ) : featuredArticlesData && (
          <FeaturedNews 
            mainArticle={featuredArticlesData[0]} 
            secondaryArticles={featuredArticlesData.slice(1)}
          />
        )}
        
        {/* Main Content and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {/* Ad Banner */}
            <div className="mb-8">
              <Advertisement type="banner" />
            </div>
            
            {/* World News */}
            {worldNewsData && (
              <CategoryNews 
                category={{ name: "World", path: "/category/world" }}
                articles={worldNewsData}
              />
            )}
            
            {/* Technology News */}
            {technologyNewsData && (
              <CategoryNews 
                category={{ name: "Technology", path: "/category/technology" }}
                articles={technologyNewsData}
              />
            )}
            
            {/* Ad Banner */}
            <div className="py-8">
              <Advertisement type="banner" />
            </div>
            
            {/* Business News */}
            {businessNewsData && (
              <CategoryNews 
                category={{ name: "Business", path: "/category/business" }}
                articles={businessNewsData}
              />
            )}
            
            {/* Sports News */}
            {sportsNewsData && (
              <CategoryNews 
                category={{ name: "Sports", path: "/category/sports" }}
                articles={sportsNewsData}
              />
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
