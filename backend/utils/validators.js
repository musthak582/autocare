const { body } = require('express-validator');

const bookingValidators = [
  body('customerName')
    .trim()
    .notEmpty().withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
  
  body('vehicleNumber')
    .trim()
    .notEmpty().withMessage('Vehicle number is required')
    .isLength({ max: 20 }).withMessage('Vehicle number too long'),
  
  body('serviceType')
    .trim()
    .notEmpty().withMessage('Service type is required'),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format'),
  
  body('time')
    .notEmpty().withMessage('Time is required')
    .isIn(['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'])
    .withMessage('Invalid time slot')
];

const serviceValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description too long'),
  
  body('estimatedDuration')
    .optional()
    .isFloat({ min: 0.5, max: 24 }).withMessage('Duration must be 0.5-24 hours'),
  
  body('estimatedCost')
    .optional()
    .isFloat({ min: 0 }).withMessage('Cost cannot be negative')
];

const authValidators = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

module.exports = {
  bookingValidators,
  serviceValidators,
  authValidators
};