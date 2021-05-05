const { ApolloError, gql } = require('apollo-server')

module.exports = {
  typeDefs: gql`
    type Transaction {
      UserId: ID
      _id: ID
      username: String
      balance: Float
      deposit: Float
      withdraw: Float
      dataDeposit: Deposit
      dataWithdraw: Withdraw
      message: String
      tanggalTransaksi: String
    }

    type Deposit {
      deposit: Float
      message: String
      tanggalTransaksi: String
      _id: ID
    }

    type Withdraw {
      withdraw: Float
      message: String
      tanggalTransaksi: String
      _id: String
    }

    input DepositInput {
      deposit: Float!
    }

    input WithdrawInput {
      withdraw: Float!
    }

    extend type Query {
      getHistoryTransactionByUserId: [Transaction]
    }

    extend type Mutation {
      postDeposit(input: DepositInput): Transaction
      postWithdraw(input: WithdrawInput): Transaction
    }
  `
}
