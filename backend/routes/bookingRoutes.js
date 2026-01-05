const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/bookingController');


router.get('/metrics', controller.getMetrics);
router.post('/', controller.createBooking);
router.get('/', controller.getAllBookings);
router.get('/:id', controller.getBookingById);
router.put('/:id/status', controller.updateBookingStatus);
router.delete('/:id', controller.deleteBooking);


module.exports = router;
