const express = require('express');
const router = express.Router()
const {
  addBookingItems,
  getBookingById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyBookings,
  getOrders,
  bookingCancel,

} = require('../data/controllers/bookingController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').post(protect, addBookingItems).get(protect, admin, getOrders)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/:id').get(protect, getBookingById)
router.route('/cancel/:id').post(protect, bookingCancel)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router;