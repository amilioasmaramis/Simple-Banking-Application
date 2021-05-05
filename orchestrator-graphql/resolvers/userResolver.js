const { ApolloError, gql } = require('apollo-server')
const axios = require('axios')
const baseUrlUser = `http://localhost:9001/users`

module.exports = {
  resolvers: {
    Query: {
      async findAllHistoryTransaction(parent, args, context, info) {
        try {
          const { data } = await axios({
            url: `${baseUrlUser}/${args.input._id}`,
            method: 'GET'
          })
          return data
        } catch(err) {
          console.log(err)
          return new ApolloError(err)
        }
      }
    },
    Mutation: {
      async register(parent, args, context, info) {
        try {
          const { data } = await axios({
            url: `${baseUrlUser}/register`,
            method: 'POST',
            data: args.input
          })
          console.log(data, '<<<<<< tanda')
          return {
            user: data.user,
            message: data.message
          }
        } catch(err) {
          console.log(err)
          return new ApolloError(err)
        }
      },
      async login(parent, args, context, info) {
        try {
          const { data } = await axios({
            url: `${baseUrlUser}/login`,
            method: 'POST',
            data: args.input
          })
          access_token = data.access_token
          return data
        } catch(err) {
          console.log(err)
          return new ApolloError(err)
        }
      }
    }
  }
}