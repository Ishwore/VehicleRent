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
    rentDate,
    rentDays,
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
      rentDate,
      rentDays,
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
// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
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
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyBookings,
  getBookings,
  getBookingsByProductId,
  updateMyBookings
}
