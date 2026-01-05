const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

exports.getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Not found' });
  res.json(booking);
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!booking) return res.status(404).json({ message: 'Not found' });

  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.getMetrics = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const total = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: 'Pending' });
    const completed = await Booking.countDocuments({ status: 'Completed' });

    let daily = 0;
    
    daily = await Booking.countDocuments({ date: todayStr });
    res.json({ total, pending, completed, daily });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};