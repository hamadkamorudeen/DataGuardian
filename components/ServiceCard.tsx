
import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelectService: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  const consentedCount = service.dataPoints.filter(dp => dp.consent).length;
  const totalCount = service.dataPoints.length;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img className="h-14 w-14 rounded-full object-cover mr-4" src={service.logo} alt={`${service.name} logo`} />
          <div>
            <h3 className="text-xl font-bold text-brand-blue">{service.name}</h3>
            <p className="text-sm text-text-secondary">{service.category}</p>
          </div>
        </div>
        <p className="text-text-secondary text-sm mb-4">{service.purpose}</p>
        <div className="flex justify-between items-center text-sm mb-6">
          <span className="font-semibold text-text-primary">Data Points Shared</span>
          <span className={`font-bold px-2 py-1 rounded-full text-white ${consentedCount > 0 ? 'bg-brand-green' : 'bg-yellow-500'}`}>
            {consentedCount}/{totalCount}
          </span>
        </div>
        <button
          onClick={() => onSelectService(service)}
          className="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors duration-200"
        >
          Manage Consent
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
