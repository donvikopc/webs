import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import Meta from '../components/Meta';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';

const Contact = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Donvik Private Limited",
    "image": "https://donvik.com/logo.png",
    "telephone": "+91-9100006020",
    "email": "info@donvik.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN"
    },
    "url": "https://donvik.com/contact",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Meta 
        title="Contact Us" 
        description="Get in touch with Donvik Private Limited for inquiries, support, or project discussions." 
        keywords="contact donvik, software support, hire developers, contact information"
        schema={localBusinessSchema}
      />
      
      <PageHeader 
        title="Get In Touch" 
        subtitle="Have a question or want to discuss a project? We'd love to hear from you."
      />

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Email Card */}
          <AnimatedSection delay={0.1} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white">
              <Mail size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Email Us</h3>
            <a href="mailto:info@donvik.com" className="text-gray-600 hover:text-primary transition-colors">
              info@donvik.com
            </a>
          </AnimatedSection>

          {/* Phone Card */}
          <AnimatedSection delay={0.2} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white">
              <Phone size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Call Us</h3>
            <a href="tel:+919100006020" className="text-gray-600 hover:text-primary transition-colors">
              +91 9100006020
            </a>
          </AnimatedSection>

          {/* Office Card */}
          <AnimatedSection delay={0.3} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white">
              <MapPin size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Visit Us</h3>
            <p className="text-gray-600 leading-relaxed">
              T-Hub, Plot No 1/C, Sy No 83/1,<br />
              Raidurgam, Knowledge City Rd,<br />
              Hyderabad, Telangana 500081
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4}>
          <ContactForm />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
