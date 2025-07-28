
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateBlogPostContent } from '../services/geminiService';
import type { BlogPostFull } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!postId) {
      setError("Post ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPost = await generateBlogPostContent(postId);
        setPost(fetchedPost);
      } catch (err) {
        setError('Failed to fetch blog post content.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [postId]);

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    return paragraphs.map((p, index) => {
        if (p.startsWith('## ')) {
            return <h2 key={index} className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{p.substring(3)}</h2>;
        }
        return <p key={index} className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{p}</p>;
    });
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-300">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to all posts
          </Link>
        </div>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : post ? (
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-6 md:p-10 lg:p-12">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <span>By {post.author}</span>
                <span>&bull;</span>
                <span>{post.publishDate}</span>
              </div>
              <div>
                {renderContent(post.content)}
              </div>
            </div>
          </article>
        ) : (
          <div className="text-center text-gray-500">Post not found.</div>
        )}
      </div>
    </main>
  );
};

export default PostPage;
