const { ApolloServer, gql } = require('apollo-server')

const UserSchema = require('./schema/userSchema')
const UserResolver = require('./resolvers/userResolver')

const TransactionSchema = require('./schema/transactionSchema')
const TransactionResolver = require('./resolvers/transactionResolver')

const jwt =  require('jsonwebtoken')
const { JWT_SECRET, PORT } = process.env

const getUser = async (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}

const server = new ApolloServer({
  typeDefs: [UserSchema.typeDefs, TransactionSchema.typeDefs],
  resolvers: [UserResolver.resolvers, TransactionResolver.resolvers],
  context: ({ req }) => {
  // get the user token from the headers
  const token = req.headers.access_token || '';

  // try to retrieve a user with the token
  const user = getUser(token);

  // optionally block the user
  // we could also check user roles/permissions here
  if (!user) throw new AuthenticationError('you must be logged in');

  // add the user and token to the context
  return { user, token };
    // return { user: authenticateUser(token.replace('Bearer', ''))}
  },
  introspection: true,
  playground: true
})

server.listen()
  .then(({url}) => 
    console.log(`Apollow has running on port ${url}`
  ))