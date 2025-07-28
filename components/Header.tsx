
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <h1 className="text-4xl font-serif font-bold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300 tracking-wider">
              7 Fashion
            </h1>
          </Link>
          {/* Navigation could be added here later */}
        </div>
      </div>
    </header>
  );
};

export default Header;
