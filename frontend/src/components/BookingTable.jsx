import React, { useState } from 'react';
import { bookingsAPI } from '../api/api';
import { STATUS_OPTIONS } from '../utils/constants';
import { 
  FaCheck, 
  FaTimes, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt,
  FaCar,
  FaUser,
  FaPhone
} from 'react-icons/fa';

const BookingTable = ({ bookings, onUpdate }) => {
  const [editingStatus, setEditingStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (id, newStatus) => {
    setLoading(true);
    try {
      await bookingsAPI.updateBookingStatus(id, newStatus);
      setEditingStatus(null);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      alert('Failed to update status: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingsAPI.deleteBooking(id);
        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        alert('Failed to delete booking');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle & Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                {/* Customer Details */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FaPhone className="mr-1 text-xs" />
                        {booking.phone}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Vehicle & Service */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 flex items-center mb-1">
                    <FaCar className="mr-2 text-gray-400" />
                    {booking.vehicleNumber}
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.serviceType}
                  </div>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    {formatDate(booking.date)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.time}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {editingStatus === booking._id ? (
                    <div className="space-x-2">
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue={booking.status}
                        onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                        disabled={loading}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setEditingStatus(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        STATUS_OPTIONS.find(s => s.value === booking.status)?.color || 'bg-gray-100'
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setEditingStatus(booking._id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Change Status"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                      className="text-green-600 hover:text-green-900"
                      title="Mark Completed"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;