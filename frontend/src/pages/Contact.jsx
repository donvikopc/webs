import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4 text-gray-900">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Have a question or want to discuss a project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Email Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <Mail size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2 text-gray-900">Email Us</h3>
            <p className="text-gray-500 text-sm">info@speshway.com</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <Phone size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2 text-gray-900">Call Us</h3>
            <p className="text-gray-500 text-sm">+91 9100006020</p>
          </div>

          {/* Office Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <MapPin size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2 text-gray-900">India Office</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              T-Hub, Plot No 1/C, Sy No 83/1,<br />
              Raidurgam, Knowledge City Rd,<br />
              panmaktha, Hyderabad, Serilingampalle..
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
