const User = require('../models/userModel')

const authorized = async (req, res, next) => {
  try {
    console.log(req.user, 'tanda req user authorize')
    const { email } = req.user
    const user = await User.findOne(email)
    if (!user) throw { name: 'error_404_user_not_found' }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorized
