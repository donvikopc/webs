import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, Clock, TrendingUp } from 'lucide-react';
import { getConfig } from '../services/configService';
import Meta from '../components/Meta';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  const [aboutImage, setAboutImage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getConfig('aboutImage');
        if (config && config.value) {
          setAboutImage(config.value);
        }
      } catch (error) {
        console.error('Error fetching about image:', error);
      }
    };
    fetchConfig();
  }, []);

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '100+', label: 'Projects Completed' },
    { icon: Clock, value: '10+', label: 'Years Experience' },
    { icon: TrendingUp, value: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="min-h-screen">
      <Meta 
        title="About Us" 
        description="Learn about Donvik Private Limited, our mission, vision, and the team driving digital transformation." 
        keywords="about donvik, company profile, software company mission, tech team"
      />
      
      <PageHeader 
        title="About Donvik Private Limited" 
        subtitle="Your trusted partner for innovative software solutions"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                Our Story
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Donvik Private Limited was founded with a vision to transform businesses through
                innovative technology solutions. What started as a small team of passionate developers
                has grown into a full-service technology partner for companies worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team of dedicated professionals works tirelessly to deliver solutions
                that exceed expectations and drive real business value.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="h-[500px] rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-100">
              {aboutImage ? (
                <img 
                  src={aboutImage} 
                  alt="Our Story" 
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-opacity-50">
                  <span className="text-4xl font-bold">Donvik</span>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide cutting-edge software solutions that empower businesses to
                achieve their full potential through digital transformation.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-secondary" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted technology partner globally, known for innovation,
                quality, and exceptional customer service.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="text-4xl font-bold mb-2 gradient-text">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals to join our growing team.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg"
              onClick={() => window.location.href = '/careers'}
            >
              View Openings
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
