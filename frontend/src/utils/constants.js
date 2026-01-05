export const API_BASE_URL = 'http://localhost:5000/api';

export const STATUS_OPTIONS = [
  { value: 'Pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Approved', label: 'Approved', color: 'bg-blue-100 text-blue-800' },
  { value: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'Rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
];

export const SERVICE_TYPES = [
  'Oil Change',
  'Brake Service',
  'Tire Rotation',
  'Engine Tune-up',
  'AC Service',
  'Battery Replacement',
  'General Inspection'
];