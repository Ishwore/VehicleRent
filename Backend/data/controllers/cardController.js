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

// @desc    Delete a card
// @route   DELETE /api/card/:id
// @access public
const removeCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id);
    // console.log(card);
    if (card) {
        await card.deleteOne()
        // await card.remove()
        res.json({ message: 'Card removed' })
    } else {
        res.status(404)
        throw new Error('card not found')
    }
})


// @desc    Fetch all card
// @route   GET /api/card
// @access  Public
const getCards = asyncHandler(async (req, res) => {
    const user_id = req.params.u_id;
    // console.log(user_id);
    const cards = await Card.find({ user_id }).sort({ _id: -1 });
    res.json(cards);
});
module.exports = {
    createCard,
    getCards,
    removeCard,
};
