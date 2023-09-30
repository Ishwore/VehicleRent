const express = require('express');
const router = express.Router()
const {
  authUser,
  registerUser,
  changePassword,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  uploadProfile,
  sendMail
} = require('../data/controllers/userController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.post('/sendMail', sendMail)
router
  .route('/profile/:id')
  .post(protect, uploadProfile)
  .put(protect, changePassword)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router;