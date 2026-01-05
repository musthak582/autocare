module.exports = {
  STATUS_OPTIONS: ['Pending', 'Approved', 'Completed', 'Rejected'],
  
  TIME_SLOTS: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
  
  DEFAULT_SERVICES: [
    { name: 'Oil Change', description: 'Engine oil and filter replacement' },
    { name: 'Brake Service', description: 'Brake pads and fluid check' },
    { name: 'Tire Rotation', description: 'Tire rotation and balancing' },
    { name: 'Engine Tune-up', description: 'Complete engine inspection and tuning' },
    { name: 'AC Service', description: 'Air conditioning system service' },
    { name: 'Battery Replacement', description: 'Battery check and replacement' },
    { name: 'General Inspection', description: 'Complete vehicle inspection' }
  ],
  
  PAGINATION_LIMIT: 20,
  
  BOOKING_HOURS: {
    start: 9,
    end: 17,
    breakStart: 12,
    breakEnd: 14
  }
};