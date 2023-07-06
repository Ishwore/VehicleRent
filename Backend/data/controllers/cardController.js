const asyncHandler = require('express-async-handler')
const Card = require('../../models/cardModel')
// const fs = require('fs');
// const path = require('path');


// @desc    Create a  card
// @route   POST /api/cards
// @access  public
const createCard = asyncHandler(async (req, res) => {
    const card = new Card(req.body);
    const createdCard = await card.save();
    res.status(201).json(createdCard)
})

module.exports = {
    createCard,
};