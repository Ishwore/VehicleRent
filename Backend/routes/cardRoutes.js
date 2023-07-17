const express = require('express')
const router = express.Router()
const {
    createCard,
    getCards,
    deleteCard,
} = require('../data/controllers/cardController');
router.route('/').post(createCard)
// router.get('/:u_id', getCards);
// router.delete('/:id', deleteCard);
router
    .route('/:id')
    .get(getCards)
    .delete(deleteCard)
module.exports = router;