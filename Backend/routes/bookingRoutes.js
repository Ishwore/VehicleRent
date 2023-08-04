const express = require('express');
const router = express.Router()
const {
  addBookingItems,
  getBookingById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyBookings,
  getBookings,
  bookingCancel,
  getBookingsByProductId,
  updateMyBookings,

} = require('../data/controllers/bookingController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').post(protect, addBookingItems).get(protect, admin, getBookings)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/bookings/:v_id').get(protect, getBookingsByProductId)
router.route('/:id').get(protect, getBookingById)
router.route('/update/:id').put(protect, updateMyBookings)
router.route('/cancel/:id').post(protect, bookingCancel)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router;