const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Transaction {
  // Post Deposit
  static postDeposit(payload) {
    return getDatabase()
      .collection('transactions')
      .insertOne(payload)
  }
  static postWithdraw(payload) {
    return getDatabase()
      .collection('transactions')
      .insertOne(payload)
  }
}

module.exports = Transaction