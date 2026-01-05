import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { bookingsAPI } from '../api/api';
import { SERVICE_TYPES } from '../utils/constants';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const BookingForm = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleNumber: '',
    serviceType: '',
    date: new Date(),
    time: '09:00'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date
    });
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      return 'Customer name is required';
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      return 'Valid 10-digit phone number is required';
    }
    if (!formData.vehicleNumber.trim()) {
      return 'Vehicle number is required';
    }
    if (!formData.serviceType) {
      return 'Please select a service type';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setMessage({ type: 'error', text: error });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const bookingData = {
        ...formData,
        date: formData.date.toISOString().split('T')[0]
      };

      await bookingsAPI.createBooking(bookingData);
      
      setMessage({ 
        type: 'success', 
        text: 'Booking submitted successfully! Your booking is pending approval.' 
      });
      
      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        vehicleNumber: '',
        serviceType: '',
        date: new Date(),
        time: '09:00'
      });

      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit booking' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Book Your Vehicle Service
      </h2>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <FaCheckCircle className="mr-3" />
          ) : (
            <FaExclamationTriangle className="mr-3" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="9876543210"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vehicle Number *
            </label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MH01AB1234"
              required
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service Type *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a service</option>
              {SERVICE_TYPES.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferred Date *
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferred Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </span>
            ) : (
              'Book Service Now'
            )}
          </button>
        </div>

        <p className="text-gray-500 text-sm text-center mt-4">
          * All fields are required. Our team will contact you to confirm your appointment.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;