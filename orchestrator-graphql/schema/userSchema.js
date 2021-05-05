const { ApolloError, gql } = require('apollo-server')

module.exports = {
  typeDefs: gql`
    type User {
      _id: ID
      username: String
      email: String
      balance: Float
      transaction: [Transactions]
      access_token: String
      message: UserResult
    }

    type Transactions {
      deposit: Float
      withdraw: Float
      message: String
      tanggalTransaksi: String
      _id: ID
    }

    type UserResult {
      user: User
      message: String
    }
    

    input UserInput {
      username: String!
      email: String!
      password: String!
    }

    input UserLoginInput {
      email: String!
      password: String!
    }

    input idUser {
      _id: ID!
    }

    type Query {
      findAllHistoryTransaction(input: idUser): User
    }

    type Mutation {
      register(input: UserInput): UserResult
      login(input: UserLoginInput): User
    }
  `
}