import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService } from '../services/blogService';
import BlogCard from '../components/BlogCard';
import { Search } from 'lucide-react';
import Meta from '../components/Meta';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await blogService.getAll();
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Meta 
        title="Our Blog" 
        description="Stay updated with the latest insights, news, and technology trends from Donvik Private Limited." 
        keywords="technology blog, software trends, tech news, insights"
      />
      
      <PageHeader 
        title="Our Blog" 
        subtitle="Insights, news, and updates from the world of technology"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="max-w-md mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <AnimatedSection className="text-center py-20 bg-gray-50 rounded-2xl">
              <h3 className="text-xl text-gray-600 mb-4">
                {searchQuery ? 'No blogs found matching your search' : 'No blogs available yet'}
              </h3>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <AnimatedSection
                  key={blog._id}
                  delay={index * 0.1}
                >
                  <Link to={`/blogs/${blog._id}`}>
                    <BlogCard blog={blog} />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
