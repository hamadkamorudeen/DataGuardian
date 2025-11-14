import React from 'react';
import type { AuditEvent } from '../types';
import { CheckCircleIcon, ShieldExclamationIcon, InformationCircleIcon } from './icons';

interface AuditTrailProps {
  events: AuditEvent[];
}

const statusIcons: { [key in AuditEvent['status']]: React.ReactNode } = {
    success: <CheckCircleIcon className="text-green-500" />,
    blocked: <ShieldExclamationIcon className="text-red-500" />,
    info: <InformationCircleIcon className="text-blue-500" />,
};

const statusColors: { [key in AuditEvent['status']]: string } = {
    success: 'border-green-500',
    blocked: 'border-red-500',
    info: 'border-blue-500',
};

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 10) return `just now`;
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};


const AuditTrail: React.FC<AuditTrailProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-blue mb-2">Data Access Audit Trail</h1>
      <p className="text-text-secondary mb-6">A transparent log of all access to your personal data.</p>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {sortedEvents.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== sortedEvents.length - 1 ? (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start space-x-4">
                    <div>
                      <span className={`h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-white ${statusColors[event.status]}`}>
                         {statusIcons[event.status]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div>
                        <div className="text-sm">
                          <p className="font-medium text-text-primary">{event.action}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-text-secondary">
                          by {event.serviceName} for "{event.purpose}"
                        </p>
                      </div>
                    </div>
                     <div className="flex-shrink-0 self-center">
                        <p className="text-sm text-gray-500">
                           {formatTimestamp(event.timestamp)}
                        </p>
                     </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;