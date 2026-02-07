import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Meta from '../components/Meta';
import Carousel from '../components/Carousel';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import { getConfig } from '../services/configService';
import ClientMarquee from '../components/ClientMarquee';

const Home = () => {
  const [headerImages, setHeaderImages] = useState([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getConfig('headerImages');
        if (config && Array.isArray(config.value) && config.value.length > 0) {
          setHeaderImages(config.value);
        } else {
          // Fallback to old bannerImage
          const oldConfig = await getConfig('bannerImage');
          if (oldConfig && oldConfig.value) {
            setHeaderImages([oldConfig.value]);
          }
        }
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };
    fetchConfig();
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Donvik Private Limited",
    "url": "https://donvik.com",
    "logo": "https://donvik.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9100006020",
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

  return (
    <>
      <Meta
        title="Home"
        description="Donvik Private Limited - Your trusted technology partner for innovative solutions and digital transformation."
        keywords="software development, web development, mobile app development, IT consulting"
        schema={organizationSchema}
      />
      <div className="min-h-screen">
      <section className="h-screen flex items-center justify-center relative px-4 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          {headerImages.length > 0 ? (
            <Carousel images={headerImages} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          )}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
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
        
        <AnimatedSection className="max-w-4xl mx-auto text-center text-white">
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
    </>
  );
};

export default Home;
