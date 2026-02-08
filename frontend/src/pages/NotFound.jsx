import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Meta from '../components/Meta';

const NotFound = () => {
  return (
    <>
      <Meta 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist." 
      />
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative -mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
