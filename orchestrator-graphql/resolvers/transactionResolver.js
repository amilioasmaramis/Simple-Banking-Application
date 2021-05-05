const { ApolloError, gql } = require('apollo-server')
const axios = require('axios')
const baseUrlTransaction = `http://localhost:10001/transactions`

module.exports = {
  resolvers: {
    Query: {
      async getHistoryTransactionByUserId(parent, args, context, info) {
        try {
          const { data } = await axios({
            url: `${baseUrlTransaction}/history`,
            method: 'GET',
            headers: {
              access_token: context.token
            }
          })
          console.log(data, '<<< history')
          return data.data
        } catch(err) {
          console.log(err)
          return new ApolloError(err)
        }
      }
    },
    Mutation: {
      async postDeposit(parent, args, context, info) {
        try {   
          console.log(context, '<<<<<')
          const { data } = await axios({
            url: `${baseUrlTransaction}/deposit`,
            method: 'POST',
            data: args.input,
            headers: {
              access_token: context.token
            }
          })
          return data
        } catch(err) {
          console.log(err)
          return new ApolloError(err)
        }
      },
      async postWithdraw(parent, args, context, info) {
        try {   
          console.log(context, '<<<<<')
          const { data } = await axios({
            url: `${baseUrlTransaction}/withdraw`,
            method: 'POST',
            data: args.input,
            headers: {
              access_token: context.token
            }
          })
          return data
        } catch(err) {
          console.log(err)
          return new ApolloError(err)
        }
      }
    }
  }
}