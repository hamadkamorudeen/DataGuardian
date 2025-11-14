
import React from 'react';
import type { Service } from '../types';
import { XIcon } from './icons';

interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
  onConsentChange: (serviceId: string, dataPointId: string, consent: boolean) => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onConsentChange }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <img className="h-12 w-12 rounded-full object-cover mr-4" src={service.logo} alt={`${service.name} logo`} />
            <div>
              <h2 className="text-2xl font-bold text-brand-blue">{service.name}</h2>
              <p className="text-text-secondary">{service.category}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <p className="text-text-secondary mb-6">{service.purpose}</p>
          <h3 className="text-lg font-semibold text-brand-blue mb-4">Your Data Points</h3>
          <div className="space-y-4">
            {service.dataPoints.map((dp) => (
              <div key={dp.id} className="flex justify-between items-center p-4 bg-light-gray rounded-lg">
                <div>
                  <p className="font-semibold text-text-primary">{dp.name}</p>
                  <p className="text-sm text-text-secondary">{dp.description}</p>
                </div>
                <label htmlFor={`toggle-${dp.id}`} className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`toggle-${dp.id}`}
                      className="sr-only"
                      checked={dp.consent}
                      onChange={(e) => onConsentChange(service.id, dp.id, e.target.checked)}
                    />
                    <div className={`block w-14 h-8 rounded-full ${dp.consent ? 'bg-brand-green' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${dp.consent ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 mt-auto">
          <button
            onClick={onClose}
            className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ServiceDetailModal;
