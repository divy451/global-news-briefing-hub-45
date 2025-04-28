
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = [
    { name: "World", path: "/category/world" },
    { name: "Politics", path: "/category/politics" },
    { name: "Business", path: "/category/business" },
    { name: "Technology", path: "/category/technology" },
    { name: "Science", path: "/category/science" },
    { name: "Health", path: "/category/health" },
    { name: "Sports", path: "/category/sports" },
    { name: "Entertainment", path: "/category/entertainment" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-news-primary text-white py-1.5 px-4 md:px-8">
        <div className="container flex justify-between items-center">
          <div className="text-xs md:text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex space-x-4">
            <Link to="/signin" className="text-xs md:text-sm hover:underline">Sign In</Link>
            <Link to="/subscribe" className="text-xs md:text-sm hover:underline">Subscribe</Link>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-4xl font-bold text-news-primary">
              <span>Global</span>
              <span className="text-news-accent">Brief</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-news-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <Button variant="default" className="bg-news-accent hover:bg-red-700">Subscribe</Button>
          </div>

          <Button 
            variant="ghost" 
            className="md:hidden" 
            onClick={toggleMenu}
          >
            <Menu />
          </Button>
        </div>
      </div>

      <nav className="border-t border-b border-gray-200 bg-white">
        <div className="container">
          <ul className="hidden md:flex space-x-6 py-3 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.name}>
                <Link 
                  to={category.path}
                  className="text-gray-600 hover:text-news-accent font-medium whitespace-nowrap transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="container py-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-news-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <ul className="space-y-3 mb-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.path}
                    className="text-gray-600 hover:text-news-accent font-medium transition-colors block"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <Button className="w-full bg-news-accent hover:bg-red-700 mb-2">Subscribe</Button>
            <Button variant="outline" className="w-full">Sign In</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
