import { Code, Database, Smartphone, Globe, Shield, Zap } from 'lucide-react';

const iconMap = {
  Code,
  Database,
  Smartphone,
  Globe,
  Shield,
  Zap,
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;
