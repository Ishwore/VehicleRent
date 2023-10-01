const express = require('express')
const router = express.Router()
const {
    verifyTransactions,
} = require('../data/controllers/khaltiController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, verifyTransactions)

module.exports = router;
