import { useState, useCallback } from 'react';
import type { Service, AuditEvent, DataPoint } from '../types';

const initialServices: Service[] = [
  {
    id: 'kuda-bank',
    name: 'Kuda Bank',
    logo: 'https://picsum.photos/seed/kuda/100',
    category: 'Finance',
    purpose: 'To provide digital banking services, process transactions, and verify identity.',
    dataPoints: [
      { id: 'dp1', name: 'Full Name', description: 'Used for account identification.', consent: true },
      { id: 'dp2', name: 'BVN (Bank Verification Number)', description: 'Required for identity verification by CBN.', consent: true },
      { id: 'dp3', name: 'Phone Number', description: 'For alerts and account recovery.', consent: true },
      { id: 'dp4', name: 'Address', description: 'For card delivery and KYC.', consent: false },
    ],
  },
  {
    id: 'mtn-nigeria',
    name: 'MTN Nigeria',
    logo: 'https://picsum.photos/seed/mtn/100',
    category: 'Telecommunication',
    purpose: 'To provide mobile network services, billing, and customer support.',
    dataPoints: [
      { id: 'dp5', name: 'Full Name', description: 'For SIM registration.', consent: true },
      { id: 'dp6', name: 'NIN (National Identity Number)', description: 'Mandatory for SIM registration.', consent: true },
      { id: 'dp7', name: 'Location Data', description: 'To improve network coverage and for marketing offers.', consent: false },
      { id: 'dp8', name: 'Call History', description: 'For billing and network analysis.', consent: true },
    ],
  },
  {
    id: 'jumia',
    name: 'Jumia',
    logo: 'https://picsum.photos/seed/jumia/100',
    category: 'E-commerce',
    purpose: 'To process orders, manage deliveries, and provide customer service.',
    dataPoints: [
      { id: 'dp9', name: 'Full Name', description: 'For order processing.', consent: true },
      { id: 'dp10', name: 'Delivery Address', description: 'To deliver your purchased items.', consent: true },
      { id: 'dp11', name: 'Email Address', description: 'For order updates and marketing communication.', consent: true },
      { id: 'dp12', name: 'Purchase History', description: 'To provide personalized recommendations.', consent: false },
    ],
  },
    {
    id: 'bolt',
    name: 'Bolt',
    logo: 'https://picsum.photos/seed/bolt/100',
    category: 'Ride-hailing',
    purpose: 'To connect riders with drivers and process payments.',
    dataPoints: [
      { id: 'dp13', name: 'Full Name', description: 'For rider identification.', consent: true },
      { id: 'dp14', name: 'Phone Number', description: 'For communication with drivers.', consent: true },
      { id: 'dp15', name: 'Real-time Location', description: 'To provide ride-hailing services.', consent: true },
      { id: 'dp16', name: 'Payment Information', description: 'To process ride fares.', consent: true },
    ],
  },
];

const initialAuditEvents: AuditEvent[] = [
  { id: 'ae1', serviceName: 'Jumia', serviceLogo: 'https://picsum.photos/seed/jumia/100', action: 'Accessed Delivery Address', purpose: 'Order Delivery', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'success' },
  { id: 'ae2', serviceName: 'Kuda Bank', serviceLogo: 'https://picsum.photos/seed/kuda/100', action: 'Viewed BVN', purpose: 'Identity Verification', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), status: 'success' },
  { id: 'ae3', serviceName: 'Unknown App', serviceLogo: 'https://picsum.photos/seed/unknown/100', action: 'Attempted to access Contacts', purpose: 'Unauthorized Request', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), status: 'blocked' },
  { id: 'ae4', serviceName: 'MTN Nigeria', serviceLogo: 'https://picsum.photos/seed/mtn/100', action: 'Updated Your Profile', purpose: 'User Request', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: 'info' },
  { id: 'ae5', serviceName: 'Bolt', serviceLogo: 'https://picsum.photos/seed/bolt/100', action: 'Accessed Real-time Location', purpose: 'Active Ride', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), status: 'success' },
];

export const useMockData = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(initialAuditEvents);

  const addAuditEvent = useCallback((event: Omit<AuditEvent, 'id' | 'timestamp'>) => {
    const newEvent: AuditEvent = {
      ...event,
      id: `ae${Date.now()}`,
      timestamp: new Date(),
    };
    setAuditEvents(prevEvents => [newEvent, ...prevEvents]);
  }, []);

  const updateConsent = useCallback((serviceId: string, dataPointId: string, consent: boolean) => {
    const service = services.find(s => s.id === serviceId);
    const dataPoint = service?.dataPoints.find(dp => dp.id === dataPointId);

    if (service && dataPoint) {
      addAuditEvent({
        serviceName: service.name,
        serviceLogo: service.logo,
        action: `Consent ${consent ? 'granted' : 'revoked'} for "${dataPoint.name}"`,
        purpose: 'User consent update',
        status: 'info',
      });
    }

    setServices(prevServices =>
      prevServices.map(s => {
        if (s.id === serviceId) {
          return {
            ...s,
            dataPoints: s.dataPoints.map(dp =>
              dp.id === dataPointId ? { ...dp, consent } : dp
            ),
          };
        }
        return s;
      })
    );
  }, [services, addAuditEvent]);

  return { services, auditEvents, updateConsent };
};