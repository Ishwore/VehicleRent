const express = require('express')
const router = express.Router()
const {
    createCard,
    getCards,
    removeCard,
} = require('../data/controllers/cardController');
router.route('/').post(createCard)
router.get('/:u_id', getCards);
router.delete('/:id', removeCard);
// router
//     .route('/:id')
//     .get(getCards)
//     .delete(removeCard)
module.exports = router;