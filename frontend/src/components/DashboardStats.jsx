import React from 'react';
import { 
  FaCalendarCheck, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaChartLine
} from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.total || 0,
      icon: <FaCalendarCheck className="text-3xl text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Pending',
      value: stats.pending || 0,
      icon: <FaClock className="text-3xl text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Completed',
      value: stats.completed || 0,
      icon: <FaCheckCircle className="text-3xl text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Rejected',
      value: stats.rejected || 0,
      icon: <FaTimesCircle className="text-3xl text-red-600" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} p-6 rounded-xl shadow-md border border-gray-200`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            {stat.icon}
          </div>
          <div className="mt-4">
            <div className="flex items-center text-gray-500 text-sm">
              <FaChartLine className="mr-2" />
              <span>Updated in real-time</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;