import { useState, useEffect } from 'react';
import { jobService } from '../services/jobService';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResumeModal from '../components/ResumeModal';
import Meta from '../components/Meta';
import PageHeader from '../components/PageHeader';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Meta 
        title="Careers" 
        description="Join the Donvik Private Limited team. Explore open job positions and build the future with us." 
        keywords="careers, jobs, hiring, software engineer jobs, tech careers"
      />
      
      <PageHeader 
        title="Join Our Team" 
        subtitle="Build the future with us. Explore our open positions and find your next challenge."
      />

      <div className="max-w-7xl mx-auto px-4 py-20">
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
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <AnimatedSection 
                key={job._id} 
                delay={index * 0.1}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                      <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full text-sm">
                        <Briefcase size={16} className="text-primary" /> {job.department}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full text-sm">
                        <MapPin size={16} className="text-primary" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full text-sm">
                        <Clock size={16} className="text-primary" /> {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2 max-w-3xl mb-4">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
                    <Link
                      to={`/careers/${job._id}`}
                      className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      View Details <ArrowRight size={18} />
                    </Link>
                    <button
                      onClick={() => handleApply(job.title)}
                      className="px-6 py-3 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
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
