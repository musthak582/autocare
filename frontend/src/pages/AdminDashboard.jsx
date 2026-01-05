import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../api/api';
import { CheckIcon, XIcon, TrashIcon } from '../components/Icons';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [allBookings, stats] = await Promise.all([
        bookingsAPI.getAllBookings(),
        bookingsAPI.getMetrics(),
      ]);
      setBookings(allBookings.data);
      setMetrics(stats.data);
    } catch (error) {
      console.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await bookingsAPI.updateBookingStatus(id, status);
      await fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await bookingsAPI.deleteBooking(id);
      await fetchData();
    } catch (err) {
      alert('Failed to delete booking');
    }
  };

  const filteredBookings = filter === 'All'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Approved': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Completed': return 'bg-green-50 text-green-700 border-green-100';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  if (isLoading && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Service Overview</h1>
        <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-lg">
          {(['All', 'Pending', 'Approved', 'Completed', 'Rejected']).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${filter === f ? 'bg-white text-fuchsia-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: metrics?.total, iconColor: 'bg-fuchsia-50 text-fuchsia-600' },
          { label: 'Pending Approvals', value: metrics?.pending, iconColor: 'bg-yellow-50 text-yellow-600' },
          { label: 'Completed Services', value: metrics?.completed, iconColor: 'bg-green-50 text-green-600' },
          { label: 'Booked Today', value: metrics?.daily, iconColor: 'bg-blue-50 text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer & Vehicle</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service & Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">No bookings found for this filter.</td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{b.customerName}</p>
                      <p className="text-xs text-gray-500">{b.phone} | <span className="font-mono text-fuchsia-600 font-medium">{b.vehicleNumber}</span></p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-700">{b.serviceType}</p>
                      <p className="text-xs text-gray-500">{new Date(b.date).toLocaleDateString()} at {b.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {b.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'Approved')}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckIcon />
                          </button>
                        )}
                        {b.status === 'Approved' && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'Completed')}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Complete"
                          >
                            <CheckIcon />
                          </button>
                        )}
                        {['Pending', 'Approved'].includes(b.status) && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'Rejected')}
                            className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XIcon />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
