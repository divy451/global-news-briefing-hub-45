
import { useQuery } from "@tanstack/react-query";
import { Article, Category, BreakingNewsItem } from "../types/news";
import { 
  breakingNews, 
  categories, 
  featuredArticles, 
  worldNews, 
  technologyNews, 
  businessNews,
  sportsNews,
  trendingArticles 
} from "../data/mockData";

// This would be replaced with actual API calls in production
const fetchBreakingNews = async (): Promise<BreakingNewsItem[]> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return breakingNews;
};

const fetchFeaturedArticles = async (): Promise<Article[]> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return featuredArticles;
};

const fetchCategories = async (): Promise<Category[]> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return categories;
};

const fetchCategoryArticles = async (category: string, limit: number = 4): Promise<Article[]> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  switch (category.toLowerCase()) {
    case "world":
      return worldNews.slice(0, limit);
    case "technology":
      return technologyNews.slice(0, limit);
    case "business":
      return businessNews.slice(0, limit);
    case "sports":
      return sportsNews.slice(0, limit);
    default:
      return [];
  }
};

const fetchTrendingArticles = async (limit: number = 5): Promise<Article[]> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return trendingArticles.slice(0, limit);
};

export function useBreakingNews() {
  return useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });
}

export function useFeaturedArticles() {
  return useQuery({
    queryKey: ["featuredArticles"],
    queryFn: fetchFeaturedArticles,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useCategoryArticles(category: string, limit?: number) {
  return useQuery({
    queryKey: ["categoryArticles", category, limit],
    queryFn: () => fetchCategoryArticles(category, limit),
    enabled: !!category,
  });
}

export function useTrendingArticles(limit?: number) {
  return useQuery({
    queryKey: ["trendingArticles", limit],
    queryFn: () => fetchTrendingArticles(limit),
  });
}

// This would connect to an actual API in production
export const apiClient = {
  fetchBreakingNews,
  fetchFeaturedArticles,
  fetchCategories,
  fetchCategoryArticles,
  fetchTrendingArticles
};
