const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class User {
  static findOne(email) {
    return getDatabase()
      .collection('users')
      .findOne({ email })
  }
  // update balance
  static updateBalance(payload) {
    return getDatabase()
      .collection('users')
      .findOneAndUpdate({
      _id: ObjectId(payload._id)
      }, {
        $set: {
          balance: payload.balance,
          transaction: payload.transaction
        }
      }, 
      {
        returnOriginal: false
      }
    )
  }
}

module.exports = User