
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#1a1a1a] font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
