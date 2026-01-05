const User = require('../models/User');

const ensureAdminExists = async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.warn('⚠ ADMIN credentials not set in .env');
    return;
  }

  const existingAdmin = await User.findOne({ username });

  if (existingAdmin) {
    console.log('✅ Admin already exists');
    return;
  }

  const admin = new User({
    username,
    password,
    role: 'admin'
  });

  await admin.save();
  console.log('✅ Admin user created from .env');
};

module.exports = ensureAdminExists;
