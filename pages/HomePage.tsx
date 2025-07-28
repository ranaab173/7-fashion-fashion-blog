
import React, { useState, useEffect } from 'react';
import { generateBlogIndex } from '../services/geminiService';
import type { BlogPostSummary } from '../types';
import BlogPostCard from '../components/BlogPostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPosts = await generateBlogIndex();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch blog posts. Displaying fallback content.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-serif font-extrabold text-gray-900 dark:text-white tracking-tight">Effortless Style, Every Day</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your daily dose of fashion inspiration, from timeless classics to the latest trends.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
