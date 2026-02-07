import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService } from '../services/blogService';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Meta from '../components/Meta';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const response = await blogService.getById(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error loading blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      });
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.image ? [blog.image] : [],
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "author": [{
      "@type": "Person",
      "name": blog.author || "Donvik Team"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Donvik Private Limited",
      "logo": {
        "@type": "ImageObject",
        "url": "https://donvik.com/logo.png"
      }
    },
    "description": blog.description
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 pb-12 md:pt-24 md:pb-16 px-4"
    >
      <Meta 
        title={blog.title} 
        description={blog.description} 
        image={blog.image}
        url={window.location.href}
        schema={blogPostingSchema}
      />
      <div className="max-w-4xl mx-auto">
        <Link to="/blogs" className="inline-flex items-center text-gray-600 hover:text-primary mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Blogs
        </Link>

        {blog.image ? (
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        ) : (
          <div className="h-64 md:h-96 bg-gradient-to-br from-primary to-secondary rounded-xl mb-8" />
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{blog.author}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-6">{blog.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{blog.description}</p>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        <button
          onClick={handleShare}
          className="mt-12 flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <Share2 size={20} />
          Share this article
        </button>
      </div>
    </motion.div>
  );
};

export default BlogPost;
