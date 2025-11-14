
export interface DataPoint {
  id: string;
  name: string;
  description: string;
  consent: boolean;
}

export interface Service {
  id: string;
  name: string;
  logo: string;
  category: string;
  purpose: string;
  dataPoints: DataPoint[];
}

export interface AuditEvent {
  id: string;
  serviceName: string;
  serviceLogo: string;
  action: string;
  purpose: string;
  timestamp: Date;
  status: 'success' | 'blocked' | 'info';
}

export type View = 'dashboard' | 'audit' | 'compliance';
