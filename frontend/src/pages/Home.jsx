import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Meta from '../components/Meta';
import Carousel from '../components/Carousel';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, CheckCircle, Zap, Shield, Clock, Users, Award, TrendingUp, Code } from 'lucide-react';
import { getConfig } from '../services/configService';
import { serviceApi } from '../services/serviceService';
import ClientMarquee from '../components/ClientMarquee';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';

const Home = () => {
  const [headerImages, setHeaderImages] = useState([]);
  const [aboutImage, setAboutImage] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch header images
        const headerConfig = await getConfig('headerImages');
        if (headerConfig && Array.isArray(headerConfig.value) && headerConfig.value.length > 0) {
          setHeaderImages(headerConfig.value);
        } else {
          const oldConfig = await getConfig('bannerImage');
          if (oldConfig && oldConfig.value) {
            setHeaderImages([oldConfig.value]);
          }
        }

        // Fetch about image
        const aboutConfig = await getConfig('aboutImage');
        if (aboutConfig && aboutConfig.value) {
          setAboutImage(aboutConfig.value);
        }

        // Fetch services
        const servicesResponse = await serviceApi.getAll();
        if (servicesResponse.data) {
          setServices(servicesResponse.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSeeMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Donvik Tech (OPC) Private Limited",
    "url": "https://donvik.com",
    "logo": "https://donvik.com/logo.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8978190675",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/donvik",
      "https://twitter.com/donvik"
    ]
  };

  const features = [
    { 
      icon: Zap,
      title: 'Expert Team', 
      desc: 'Highly skilled professionals with years of experience delivering top-tier solutions.' 
    },
    { 
      icon: Shield,
      title: 'Quality Solutions', 
      desc: 'Delivering robust, secure, and scalable software solutions tailored to your needs.' 
    },
    { 
      icon: Clock,
      title: '24/7 Support', 
      desc: 'Round-the-clock assistance ensuring your business operations never stop.' 
    },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '100+', label: 'Projects Completed' },
    { icon: TrendingUp, value: '99%', label: 'Client Satisfaction' },
    { icon: Code, value: '50+', label: 'Expert Developers' },
  ];

  return (
    <>
      <Meta
        title="Home"
        description="Donvik Tech (OPC) Private Limited - Your trusted technology partner for innovative solutions and digital transformation."
        keywords="Donvik, Donvik OPC, Donvik Tech, donvikopc, donvikopctech"
        schema={organizationSchema}
      />
      <div className="min-h-screen">
      <section className="h-screen flex items-center justify-center relative px-4 overflow-hidden bg-black">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          {headerImages.length > 0 ? (
            <Carousel images={headerImages} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          )}
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="flex flex-col items-center">
                <stat.icon size={32} className="mb-2 opacity-80" />
                <h3 className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</h3>
                <p className="text-blue-100 text-sm md:text-base">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 h-[400px] md:h-[500px] bg-gray-50">
                   {aboutImage ? (
                    <img 
                      src={aboutImage} 
                      alt="About Donvik Tech" 
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Shield size={64} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full z-0"></div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="order-1 md:order-2" delay={0.2}>
              <h4 className="text-primary font-bold tracking-wider uppercase mb-2">Who We Are</h4>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Transforming Businesses with <span className="text-primary">Technology</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                At Donvik Tech (OPC) Private Limited, we believe in the power of technology to solve complex business challenges. 
                Our team of experts is dedicated to delivering innovative solutions that drive growth and efficiency.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Custom Software Development',
                  'Enterprise Digital Transformation',
                  'Cloud Solutions & Integration',
                  'Dedicated Support & Maintenance'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <button className="text-primary font-bold hover:text-blue-700 flex items-center gap-2 group transition-colors">
                  Learn More About Us 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      {services.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-2">What We Do</h4>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We offer a comprehensive suite of software solutions designed to meet your unique business requirements.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => (
                <AnimatedSection key={service._id} delay={index * 0.1} className="h-full">
                  <ServiceCard service={service} onSeeMore={handleSeeMore} />
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center">
              <Link to="/services">
                <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
                  View All Services
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform translate-x-20 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ClientMarquee />

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 -z-10"></div>
        <div className="absolute inset-0 bg-primary/10 -z-10"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <AnimatedSection className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Let's discuss how we can help transform your business with our cutting-edge technology solutions.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center mx-auto gap-2"
            >
              Contact Us <ArrowRight size={20} />
            </motion.button>
          </Link>
        </AnimatedSection>
      </section>
    </div>

    <ServiceModal 
      service={selectedService} 
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
    />
    </>
  );
};

export default Home;
