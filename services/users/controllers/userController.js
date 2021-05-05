const User = require('../models/userModel.js')
const { hashing, compare } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
  // Register User
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) throw { name: 'error_400_username_email_password_empty' }
      const passwordHashed = hashing(password)
      const user = await User.insert({
        username, 
        email, 
        password: passwordHashed,
        balance: 500000,
        transaction: []
      })
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
  // Login User
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
        _id: user._id, 
        username: user.username,
        email: user.email
      })
    } catch (err) {
      next(err)
    }
  }
  // Get History All Transaction by User
  static async findAllHistoryTransaction(req, res, next) {
    try {
      const { _id } = req.params
      const user = await User.findHistoryByUserId(_id)
      console.log(user, '<<<< Data User')
      if (!user) throw { name: "error_404_user_not_found" }
      res.status(200).json(user)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = UserController