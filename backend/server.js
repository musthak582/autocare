require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const ensureAdminExists = require('./config/ensureAdmin');
const ensureServicesExist = require('./config/ensureServices');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  await connectDB();
  await ensureAdminExists();
  // Populate default services if not exists
  await ensureServicesExist();
})();

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
