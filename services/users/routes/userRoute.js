const router = require('express').Router()
const UserController = require('../controllers/userController.js')

// Register User
router.post('/register', UserController.register)
// Login User
router.post('/login', UserController.login)
// Get History All Transaction by User from Collection User
router.get('/:_id', UserController.findAllHistoryTransaction)

module.exports = router