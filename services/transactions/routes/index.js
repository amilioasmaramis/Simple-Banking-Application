const router = require('express').Router()
const TransactionRoute = require('./transactionRoute')

router.use('/transactions', TransactionRoute)

module.exports = router