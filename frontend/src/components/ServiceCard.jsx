import { Code, Database, Smartphone, Globe, Shield, Zap } from 'lucide-react';

const iconMap = {
  Code,
  Database,
  Smartphone,
  Globe,
  Shield,
  Zap,
};

const ServiceCard = ({ service, onSeeMore }) => {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
        <Icon className="text-blue-600" size={24} />
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-900">{service.name}</h3>
      
      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
        {service.description}
      </p>

      {service.features && service.features.length > 0 && (
        <ul className="mb-8 space-y-2">
          {service.features.slice(0, 2).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="truncate">{feature}</span>
            </li>
          ))}
          {service.features.length > 2 && (
            <li className="text-sm text-blue-500 font-medium pl-3.5">
              +{service.features.length - 2} more features
            </li>
          )}
        </ul>
      )}

      <button 
        onClick={() => onSeeMore(service)}
        className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mt-auto"
      >
        See More
      </button>
    </div>
  );
};

export default ServiceCard;
