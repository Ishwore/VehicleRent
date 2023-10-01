const asyncHandler = require('express-async-handler')
const Booking = require('../../models/bookingModel.js')

// @desc    Create new booking
// @route   POST /api/booking
// @access  Private
const addBookingItems = asyncHandler(async (req, res) => {
  const {
    bookingItems,
    shippingAddress,
    paymentMethod,
    vehicleId,
    fromDate,
    untilDate,
    totalRent,
  } = req.body

  if (bookingItems && bookingItems.length === 0) {
    res.status(400)
    throw new Error('No booking items')
    return
  } else {
    const booking = new Booking({
      bookingItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      vehicleId,
      fromDate,
      untilDate,
      totalRent,
    })

    const createdBooking = await booking.save()

    res.status(201).json(createdBooking)
  }
})

// @desc    Get booking by ID
// @route   GET /api/booking/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    res.json(booking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    booking cancel
// @route   post /api/booking/cancel/:id'
// @access  Private
const bookingCancel = asyncHandler(async (req, res) => {
  const { cancel, cancelMessage } = req.body;
  // console.log(req.body);
  const booking = await Booking.findById(req.params.id)


  // console.log(cancel, cancelMessage);
  if (booking) {

    booking.cancel = cancel;
    booking.cancelMessage = cancelMessage;
    const updatedCancel = await booking.save()
    res.json(updatedCancel)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})
// @desc    Update booking to paid
// @route   GET /api/booking/:id/pay
// @access  Private
const updateBookingToPaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  const { paymentResult } = req.body
  console.log(paymentResult);
  if (booking) {
    booking.isPaid = true
    booking.paidAt = Date.now()
    booking.paymentMethod = 'wallet payment'
    booking.paymentResult = paymentResult

    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})


// @desc    Get logged in user booking
// @route   GET /api/booking//mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
  res.json(bookings)
})

// @desc    update user booking using booking id
// @route    post /api/booking/update /:id
// @access  Private
const updateMyBookings = asyncHandler(async (req, res) => {
  const {
    qty,
    totalRent,
    shippingAddress,
  } = req.body
  // console.log(qty, shippingAddress);
  const booking = await Booking.findById(req.params.id)
  if (booking) {
    if (shippingAddress !== '') {
      booking.shippingAddress = shippingAddress
      await booking.save()
    }

    if (qty !== '') {
      booking.bookingItems[0].qty = qty
      booking.totalRent = totalRent
      await booking.save()
    }

    res.json(booking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    Get booking by productid
// @route   GET /api/booking/ bookings /: v_id
// @access  Private 

const getBookingsByProductId = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ vehicleId: req.params.v_id })
  res.json(bookings)
})
// @desc    Get all orders
// @route   GET /api/orders / bookings /: v_id
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
  res.json(bookings)
})

module.exports = {
  addBookingItems,
  getBookingById,
  bookingCancel,
  updateBookingToPaid,
  getMyBookings,
  getBookings,
  getBookingsByProductId,
  updateMyBookings
}
