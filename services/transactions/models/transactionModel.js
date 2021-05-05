const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Transaction {
  // Post Deposit
  static postDeposit(payload) {
    return getDatabase()
      .collection('transactions')
      .insertOne(payload)
  }
  // Post Withdraw
  static postWithdraw(payload) {
    return getDatabase()
      .collection('transactions')
      .insertOne(payload)
  }
  // Get History All Transaction by UserId from Collection Transactions
  static getHistoryTransactionByUserId(payload) {
    return getDatabase()
      .collection('transactions')
      .find({
        UserId: ObjectId(payload._id)
      })
      .toArray()
  }
}

module.exports = Transaction