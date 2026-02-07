import { Calendar, User } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
      {blog.image ? (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary to-secondary" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{blog.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
