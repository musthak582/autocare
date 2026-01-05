import React from 'react';
import BookingForm from '../components/BookingForm';
import { FaCar, FaClock, FaShieldAlt, FaTools } from 'react-icons/fa';

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Professional Vehicle Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book your vehicle service online with our certified technicians. Fast, reliable, and convenient.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaCar className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Any Vehicle Type</h3>
            <p className="text-gray-600">Cars, SUVs, Trucks & more</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaClock className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Quick Service</h3>
            <p className="text-gray-600">Same-day appointments available</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaShieldAlt className="text-4xl text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Warranty</h3>
            <p className="text-gray-600">6-month service warranty</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaTools className="text-4xl text-orange-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Expert Technicians</h3>
            <p className="text-gray-600">Certified professionals</p>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm />

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Why Choose Our Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden charges. Get upfront quotes before any work begins.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Quality Parts</h3>
              <p className="text-gray-600">We use only genuine/OE parts for all repairs and services.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Convenient</h3>
              <p className="text-gray-600">Online booking, flexible timings, and digital payment options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;