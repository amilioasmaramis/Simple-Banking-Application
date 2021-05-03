const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')

const authentication = require('../middlewares/authentication')
const authorized = require('../middlewares/authorized')

// router.use(authentication)
// Post deposit money
router.post('/deposit', authentication, authorized, TransactionController.postDeposit)
// Post withdraw money
router.post('/withdraw', authentication, authorized, TransactionController.postWithdraw)

module.exports = router
