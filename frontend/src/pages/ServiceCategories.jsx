
import React, { useState, useEffect } from 'react';
import { servicesAPI } from '../api/api.js';


const ServiceCategories = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    const data = await servicesAPI.getAllServices();
    setServices(data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    setIsLoading(true);
    try {
      await servicesAPI.createService({name, description});
      setName('');
      setDescription('');
      await fetchServices();
    } catch (err) {
      alert('Failed to add service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Service Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all"
                placeholder="e.g. Battery Replacement"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all resize-none"
                rows={3}
                placeholder="Briefly describe the service..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-fuchsia-600 text-white font-bold py-2.5 rounded-xl hover:bg-fuchsia-700 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Add Service'}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => (
            <div key={service._id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">{service.name}</h3>
                <span className="w-8 h-8 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                  {service.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{service.description || 'No description provided.'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
