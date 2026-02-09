import { useState, useEffect } from 'react';
import { jobService } from '../services/jobService';
import { Briefcase, MapPin, Clock, ArrowRight, Rocket, Heart, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResumeModal from '../components/ResumeModal';
import Meta from '../components/Meta';
import AnimatedSection from '../components/AnimatedSection';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getAll();
      setJobs(response.data.filter(job => job.status === 'Open'));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (title) => {
    setSelectedJobTitle(title);
    setIsModalOpen(true);
  };

  const scrollToJobs = () => {
    document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: Rocket,
      title: 'Fast-Paced Growth',
      description: 'Accelerate your career in a high-growth environment where your impact matters.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive medical coverage and wellness programs for you and your family.'
    },
    {
      icon: Users,
      title: 'Great Culture',
      description: 'Collaborative, inclusive, and fun work environment with regular team events.'
    },
    {
      icon: Zap,
      title: 'Competitive Pay',
      description: 'Market-leading salaries and performance-based bonuses for all employees.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Meta 
        title="Careers" 
        description="Join the Donvik Tech (OPC) Private Limited team. Explore open job positions and build the future with us." 
        keywords="careers, jobs, hiring, software engineer jobs, tech careers, donvik careers, work at donvik"
      />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Build the Future of <span className="text-primary">Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Join a team of passionate individuals revolutionizing how businesses operate. 
              We're looking for dreamers, doers, and problem solvers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToJobs}
              className="gradient-bg text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              View Open Roles
            </motion.button>
          </motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Donvik?</h2>
            <p className="text-gray-600">More than just a job, it's a career with purpose.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 0.1}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <benefit.icon size={24} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div id="open-positions" className="max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-gray-600">Find your next role at Donvik.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : jobs.length === 0 ? (
          <AnimatedSection className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Open Positions</h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              We don't have any open roles right now, but we're always looking for talent.
              Feel free to send us your resume!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleApply('General Application')}
              className="gradient-bg text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
            >
              Submit Resume
            </motion.button>
          </AnimatedSection>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <AnimatedSection 
                key={job._id} 
                delay={index * 0.1}
                className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <Link
                      to={`/careers/${job._id}`}
                      className="px-6 py-2.5 text-gray-600 font-medium hover:text-primary transition-colors"
                    >
                      View Details
                    </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApply(job.title)}
                    className="px-6 py-2.5 bg-blue-50 text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    Apply Now
                  </motion.button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      {/* Don't See Right Fit Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't see the right fit?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            We're always looking for talented people to join our team. 
            Send us your resume and we'll keep you in mind for future openings.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "white", color: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleApply('General Application')}
            className="bg-white text-primary px-10 py-4 rounded-full font-bold shadow-lg transition-all"
          >
            Submit General Application
          </motion.button>
        </div>
      </div>

      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPosition={selectedJobTitle}
      />
    </div>
  );
};

export default Careers;
