const generateToken = (user) => {
  return require('jsonwebtoken').sign(
    { 
      id: user._id, 
      username: user.username,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const formatBookingResponse = (booking) => {
  return {
    _id: booking._id,
    customerName: booking.customerName,
    phone: booking.phone,
    vehicleNumber: booking.vehicleNumber,
    serviceType: booking.serviceType,
    date: booking.date,
    time: booking.time,
    status: booking.status,
    notes: booking.notes,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt
  };
};

const calculateStats = (bookings) => {
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const approved = bookings.filter(b => b.status === 'Approved').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const rejected = bookings.filter(b => b.status === 'Rejected').length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate.getTime() === today.getTime();
  }).length;
  
  return {
    total,
    pending,
    approved,
    completed,
    rejected,
    today: todayBookings
  };
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

module.exports = {
  generateToken,
  formatBookingResponse,
  calculateStats,
  isValidDate
};