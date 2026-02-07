import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { Briefcase, MapPin, Clock, ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import ResumeModal from '../components/ResumeModal';
import Meta from '../components/Meta';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobService.getById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
      navigate('/careers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) return null;

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.createdAt,
    "employmentType": job.type?.toUpperCase().replace(' ', '_'),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Donvik Private Limited",
      "sameAs": "https://donvik.com",
      "logo": "https://donvik.com/logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location || "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <Meta 
        title={job.title} 
        description={`${job.title} at Donvik Private Limited. ${job.description.substring(0, 150)}...`} 
        url={window.location.href}
        schema={jobPostingSchema}
      />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/careers')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Careers
          </button>
          
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> {job.department}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> {job.type}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" /> {job.experience} Experience
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto px-8 py-3 gradient-bg text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Role</h2>
            <div className="prose max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </section>

          {/* We could split responsibilities if they were separate, but currently they are in description */}
          {/* If you want to encourage structured data later, we can update the schema */}
          
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Join Us?</h3>
            <ul className="space-y-3">
              {[
                'Competitive salary and equity packages',
                'Flexible working hours and remote options',
                'Health, dental, and vision insurance',
                'Professional development budget',
                'Regular team retreats and events'
              ].map((perk, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPosition={job.title}
      />
    </div>
  );
};

export default JobDetail;
