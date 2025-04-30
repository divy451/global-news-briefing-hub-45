
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Advertise", path: "/advertise" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-news-primary text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-slide-in-left">
            <h3 className="text-xl font-bold mb-4 inline-block relative">
              <span>Nexus</span>
              <span className="text-news-accent">Vista</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-news-accent"></span>
            </h3>
            <p className="text-gray-300 mb-4">
              Delivering unique perspectives and unrivaled insights on global events that challenge conventional narratives.
            </p>
            <p className="text-gray-300 text-sm">
              © {currentYear} NexusVista. All rights reserved.
            </p>
          </div>

          <div className="animate-slide-in-bottom" style={{animationDelay: "100ms"}}>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Categories
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-news-accent"></span>
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.name} className="hover-lift">
                  <Link 
                    to={category.path}
                    className="text-gray-300 hover:text-news-accent transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-in-bottom" style={{animationDelay: "200ms"}}>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Company
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-news-accent"></span>
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name} className="hover-lift">
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-news-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-in-right" style={{animationDelay: "300ms"}}>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-news-accent"></span>
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name} className="hover-lift">
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-news-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} NexusVista. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-news-accent transition-colors hover-lift">Facebook</a>
            <a href="#" className="hover:text-news-accent transition-colors hover-lift">Twitter</a>
            <a href="#" className="hover:text-news-accent transition-colors hover-lift">Instagram</a>
            <a href="#" className="hover:text-news-accent transition-colors hover-lift">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
