
import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPostSummary } from '../types';

interface BlogPostCardProps {
  post: BlogPostSummary;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="block group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
        <div className="relative">
            <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-pink-500 dark:text-pink-400 uppercase tracking-wider mb-2">
              {post.category}
            </p>
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed flex-grow">
                {post.summary}
            </p>
            <div className="mt-4">
               <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-pink-500 transition-colors duration-300">
                  Read More &rarr;
              </span>
            </div>
        </div>
    </Link>
  );
};

export default BlogPostCard;
