const express = require('express')
const router = express.Router()
const {
    createCard
} = require('../data/controllers/cardController');
router.route('/').post(createCard)
module.exports = router;