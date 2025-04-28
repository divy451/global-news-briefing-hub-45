
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  path: string;
}

export interface Category {
  id: string;
  name: string;
  path: string;
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  path: string;
}
