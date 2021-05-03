const User = require('../models/userModel.js')
const { hashing, compare } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) throw { name: 'error_400_username_email_password_empty' }
      const passwordHashed = hashing(password)
      const user = await User.insert({username, email, password: passwordHashed })
      console.log({
        user: user.ops[0],
        message: 'Add new User successfully'
      })
      res.status(201).json({
        user: user.ops[0],
        message: 'Add new User successfully'
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: 'error_400_email_password_empty' }
      
      const user = await User.findOne(email)
      if (!user) throw { name: 'error_400_wrong_email_password' }
      
      const isValidPassword = compare(password, user.password)
      if (!isValidPassword) throw { name: 'error_400_wrong_email_password' }
      
      const access_token = generateToken({
        _id: user._id,
        email: user.email,
        username: user.username
      })
      console.log({
        access_token, 
        id: user._id, 
        username: user.username
      }, 'login user from controller')
      res.status(200).json({ 
        access_token, 
        id: user._id, 
        username: user.username
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController