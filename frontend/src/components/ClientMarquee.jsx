import { useEffect, useState } from 'react';
import { clientService } from '../services/clientService';

const ClientMarquee = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientService.getAll();
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  if (clients.length === 0) return null;

  // Ensure we have enough items to scroll smoothly
  // We need enough items to fill the screen width. 
  // A safe number is 10-12 items minimum.
  let baseClients = [...clients];
  while (baseClients.length < 10) {
    baseClients = [...baseClients, ...clients];
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Our Trusted Clients</h2>
        <p className="text-xl text-gray-600">Proud to serve industry leaders across various sectors</p>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {/* First Half */}
          <div className="flex items-center gap-16 px-8">
            {baseClients.map((client, index) => (
              <div key={`${client._id}-${index}`} className="w-64 h-40 flex items-center justify-center p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Second Half (Exact Duplicate) */}
          <div className="flex items-center gap-16 px-8">
            {baseClients.map((client, index) => (
              <div key={`${client._id}-${index}-duplicate`} className="w-64 h-40 flex items-center justify-center p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
