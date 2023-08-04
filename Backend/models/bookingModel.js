const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    bookingItems: [
      {
        vname: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    rentDate: {
      type: String,
      required: true,
    },
    rentDays: {
      type: Number,
      required: true,
    },
    totalRent: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    cancel: {
      type: Boolean,
      required: true,
      default: false,
    },
    cancelMessage: {
      type: String,
      default: "",

    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      paidAmt: { type: Number },
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking