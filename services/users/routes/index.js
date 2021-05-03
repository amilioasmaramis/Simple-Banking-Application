const router = require('express').Router()
const UserRoute = require('./userRoute')

router.use('/users', UserRoute)

module.exports = router