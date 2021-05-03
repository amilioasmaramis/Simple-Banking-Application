const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb')

class User {
  static findOne(email) {
    return getDatabase()
      .collection('users')
      .findOne({ email })
  }
  static insert(payload) {
    return getDatabase()
    .collection('users')
    .insertOne(payload)
  }
  static findHistoryByUserId(_id) {
    return getDatabase()
      .collection('users')
      .findOne({ 
        _id: ObjectId(_id) 
      })
  }
}

module.exports = User
