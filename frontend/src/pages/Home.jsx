import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Meta from '../components/Meta';
import Carousel from '../components/Carousel';
import { ArrowRight, CheckCircle } from 'lucide-react';
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

  return (
    <>
      <Meta
        title="Home"
        description="Donvik Private Limited - Your trusted technology partner for innovative solutions and digital transformation."
        keywords="software development, web development, mobile app development, IT consulting"
      />
      <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          {headerImages.length > 0 ? (
            <Carousel images={headerImages} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          )}
        </div>
        
        <div className="max-w-7xl mx-auto z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Transform Your Business</span>
              <br />
              <span className="text-white">With Digital Innovation</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Donvik Private Limited delivers cutting-edge software solutions that drive growth,
              enhance efficiency, and build lasting digital experiences.
            </p>

          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Team', desc: 'Highly skilled professionals with years of experience' },
              { title: 'Quality Solutions', desc: 'Delivering robust and scalable software solutions' },
              { title: '24/7 Support', desc: 'Round-the-clock assistance for all your needs' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6"
              >
                <CheckCircle className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ClientMarquee />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how we can help transform your business.
          </p>
          <Link to="/contact">
            <Button>
              Contact Us <ArrowRight className="inline ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
