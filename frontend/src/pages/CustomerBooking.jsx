
import React, { useState, useEffect } from 'react';
import { bookingsAPI, servicesAPI } from '../api/api';

const CustomerBooking = () => {
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleNumber: '',
    serviceType: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    servicesAPI.getAllServices().then(res => {
      setServices(res.data);
    });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookingsAPI.createBooking(formData);
      setSuccess(true);
      setFormData({
        customerName: '',
        phone: '',
        vehicleNumber: '',
        serviceType: '',
        date: '',
        time: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert('Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Schedule Your Service</h1>
        <p className="mt-4 text-lg text-gray-500">Book your vehicle service appointment in less than a minute.</p>
      </div>

      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
            <span>Your booking request has been submitted successfully! We will review it shortly.</span>
            <button onClick={() => setSuccess(false)} className="text-green-800 hover:text-green-900 font-bold">X</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
                value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                placeholder="555-0199"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Number</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                placeholder="ABC-1234"
                value={formData.vehicleNumber}
                onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all bg-white"
                value={formData.serviceType}
                onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
              >
                <option value="">Select a service</option>
                {services.map(s => (
                  <option key={s._id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time</label>
              <input
                type="time"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-fuchsia-600 text-white font-bold py-3 rounded-xl hover:bg-fuchsia-700 focus:ring-4 focus:ring-fuchsia-200 transition-all disabled:opacity-50 shadow-lg shadow-fuchsia-100"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white border border-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900">Fast Turnaround</h3>
          <p className="text-sm text-gray-500 mt-2">Get back on the road in no time with our efficient service team.</p>
        </div>
        <div className="p-6 bg-white border border-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900">Certified Techs</h3>
          <p className="text-sm text-gray-500 mt-2">Your vehicle is in good hands with our expert mechanics.</p>
        </div>
        <div className="p-6 bg-white border border-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900">Premium Tools</h3>
          <p className="text-sm text-gray-500 mt-2">We use the latest diagnostic equipment for all repairs.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerBooking;
