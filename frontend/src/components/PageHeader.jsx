import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, bgImage }) => {
  return (
    <div className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-30" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-primary/30" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
