
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AuditTrail from './components/AuditTrail';
import ComplianceChecker from './components/ComplianceChecker';
import ServiceDetailModal from './components/ServiceDetailModal';
import { useMockData } from './hooks/useMockData';
import type { Service, View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const { services, auditEvents, updateConsent } = useMockData();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelectService = useCallback((service: Service) => {
    setSelectedService(service);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  const handleConsentChange = useCallback((serviceId: string, dataPointId: string, consent: boolean) => {
    updateConsent(serviceId, dataPointId, consent);
    // Update the selected service in the modal to reflect the change
    if (selectedService && selectedService.id === serviceId) {
      const updatedService = { ...selectedService };
      const dataPoint = updatedService.dataPoints.find(dp => dp.id === dataPointId);
      if (dataPoint) {
        dataPoint.consent = consent;
      }
      setSelectedService(updatedService);
    }
  }, [selectedService, updateConsent]);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard services={services} onSelectService={handleSelectService} />;
      case 'audit':
        return <AuditTrail events={auditEvents} />;
      case 'compliance':
        return <ComplianceChecker />;
      default:
        return <Dashboard services={services} onSelectService={handleSelectService} />;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray font-sans text-text-primary">
      <Header activeView={view} setView={setView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderView()}
      </main>
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={handleCloseModal}
          onConsentChange={handleConsentChange}
        />
      )}
    </div>
  );
};

export default App;
