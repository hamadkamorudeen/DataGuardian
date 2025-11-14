import React, { useState } from 'react';
import type { Service } from '../types';
import ServiceCard from './ServiceCard';

interface DashboardProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ services, onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-blue mb-2">My Data Dashboard</h1>
      <p className="text-text-secondary mb-6">View and manage the organizations that have access to your personal data.</p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for an organization..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} onSelectService={onSelectService} />
        ))}
        {filteredServices.length === 0 && (
            <p className="text-text-secondary md:col-span-2 lg:col-span-3">No organizations found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;