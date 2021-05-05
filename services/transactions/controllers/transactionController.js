const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

let date = new Date();  
let options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
};

class TransactionController {
  // Post Deposit
  static async postDeposit(req, res, next) {
    try {
      console.log(req.user.email)
      const { deposit } = req.body
      const { email } = req.user

      if (!deposit) throw { name: "error_400_body_invalid"}

      const user = await User.findOne(email)
      if (!user) throw { name: "error_404_user_not_found"}
      console.log(user, '<<<<< get user by email')

      const dataDeposit =  await Transaction.postDeposit({
        UserId: user._id,
        deposit,
        message: `Successfully deposit your saldo with ${deposit}`,
        tanggalTransaksi: date.toLocaleTimeString("en-us", options)
      })
      console.log(dataDeposit.ops[0], `<<<< deposit saldo`)

      const updateUser = await User.updateBalance({
        _id: req.user._id,
        balance: user.balance + dataDeposit.ops[0].deposit,
        transaction: user.transaction.concat(dataDeposit.ops[0])
      })
      console.log(updateUser, "<<<< update balance user from controller")

      res.status(201).json({
        UserId: user._id,
        username: user.username,
        balance: updateUser.value.balance,
        dataDeposit: dataDeposit.ops[0],
        message: "Sucessfully post deposit into your account"
      })
    } catch(err) {
      next(err)
    }
  }
  // Post Withdraw
  static async postWithdraw(req, res, next) {
    try {
      console.log(req.user.email)
      const { withdraw } = req.body
      const { email } = req.user

      if (!withdraw) throw { name: "error_400_body_invalid"}

      const user = await User.findOne(email)
      console.log(user, '<<<<< get user by email')

      const dataWithdraw =  await Transaction.postWithdraw({
        UserId: user._id,
        withdraw,
        message: `Successfully withdraw your saldo with ${withdraw}`,
        tanggalTransaksi: date.toLocaleTimeString("en-us", options)
      })
      console.log(dataWithdraw.ops[0], `<<<< deposit saldo`)
      console.log(user.balance - dataWithdraw.ops[0].withdraw < user.balance, user.balance, '<<<< conditional statement')

      if (user.balance - dataWithdraw.ops[0].withdraw < 0) {
        throw { name: "error_400_balance_not_enough"}
      } else {
        const updateUser = await User.updateBalance({
          _id: req.user._id,
          balance: user.balance - dataWithdraw.ops[0].withdraw,
          transaction: user.transaction.concat(dataWithdraw.ops[0])
        })
        console.log(updateUser, "<<<< update balance user from controller")
        
        res.status(201).json({
          UserId: user._id,
          username: user.username,
          balance: updateUser.value.balance,
          dataWithdraw: dataWithdraw.ops[0],
          message: `Sucessfully withdraw with ${withdraw} from your account`
        })
      }
    } catch(err) {
      next(err)
    }
  }
  // Get History All Transaction by UserId from Collection Transactions
  static async getHistoryTransactionByUserId(req, res, next) {
    try {
      const data = await Transaction.getHistoryTransactionByUserId({ _id: req.user._id})
      res.status(200).json({ data })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = TransactionController