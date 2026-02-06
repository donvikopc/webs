import { useState } from 'react';
import { contactService } from '../services/contactService';
import { FileText, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      await contactService.submit(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto border border-gray-200 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Send Us a Message
        </h2>
        <p className="text-gray-500">
          Fill out the form below and we'll respond within 24 hours
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-900 text-sm md:text-base">
            Looking for a job? <span className="font-normal text-gray-600">We're always looking for talented individuals to join our team.</span>
          </p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap font-medium text-sm shadow-sm">
          <FileText size={16} />
          Submit Your Resume
        </button>
      </div>

      {status === 'success' && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-gray-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-gray-400"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-gray-400"
              placeholder="+91 1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-gray-400"
              placeholder="How can we help?"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none placeholder-gray-400"
            placeholder="Tell us more about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
          <Send size={18} className={status !== 'submitting' ? "transform -rotate-45" : ""} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
