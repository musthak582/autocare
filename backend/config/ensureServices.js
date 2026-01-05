const Service = require('../models/Service'); // Make sure you have a Service model

const defaultServices = [
  { name: 'Oil Change', description: 'Engine oil and filter replacement' },
  { name: 'Brake Service', description: 'Full check of brake pads and rotors' },
  { name: 'Tire Rotation', description: 'Even out tire wear' },
  { name: 'Engine Tune-up', description: 'Comprehensive engine check' },
  { name: 'AC Service', description: 'Air conditioning system maintenance' },
  { name: 'Battery Replacement', description: 'Replace old or weak battery' },
  { name: 'General Inspection', description: 'Full vehicle inspection' },
];

const ensureServicesExist = async () => {
  for (let service of defaultServices) {
    const exists = await Service.findOne({ name: service.name });
    if (!exists) {
      await Service.create(service);
      console.log(`✅ Service created: ${service.name}`);
    }
  }
};

module.exports = ensureServicesExist;
