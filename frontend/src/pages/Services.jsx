import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { serviceApi } from '../services/serviceService';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import Meta from '../components/Meta';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await serviceApi.getAll();
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Add a small delay to clear selected service for smooth exit animation
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <div className="min-h-screen">
      <Meta 
        title="Our Services" 
        description="Explore our comprehensive software solutions tailored to your business needs, including web development, app development, and consulting." 
        keywords="software services, web development, app development, IT solutions, donvik services, custom software"
      />
      
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive solutions tailored to meet your business needs"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : services.length === 0 ? (
            <AnimatedSection className="text-center py-20 bg-gray-50 rounded-2xl">
              <h3 className="text-xl text-gray-600 mb-4">No services available yet</h3>
              <p className="text-gray-500">Please check back later.</p>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedSection
                  key={service._id}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <ServiceCard 
                    service={service} 
                    onSeeMore={handleSeeMore}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Services;
