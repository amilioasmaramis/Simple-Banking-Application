const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb')

class User {
  static findOne(email) {
    return getDatabase().collection('user').findOne({ email })
  }
  static insert(payload) {
    return getDatabase().collection('user').insertOne(payload)
  }
}

module.exports = User
