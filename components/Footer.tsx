
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} 7 Fashion. All Rights Reserved.</p>
        {/* Social media links can be added here */}
      </div>
    </footer>
  );
};

export default Footer;
