const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Session {
    cookie: Cookie
    user: User
  }
  type Cookie {
      expires: String
      httpOnly: Boolean
      originalMaxAge: Int
      path: String
      sameSite: Boolean
      secure: Boolean
  }
  type User {
    _id: ID!
    username: String!
    password: String
  }
  
  type RootMutation {
    signUp(userInput: UserInputData): Session!
  }

  input UserInputData {
    username: String!
    password: String!
  }
  type RootQuery{
    hello: String
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

// type Session {
//   cookie: Cookie
//   user: User
// }
// type Cookie {
//     expires: String
//     httpOnly: Boolean
//     originalMaxAge: Int
//     path: String
//     sameSite: Boolean
//     secure: Boolean
// }
// type User {
//   _id: ID!
//   username: String!
//   password: String
// }
// type RootMutation {
//   signUp(userInput: UserInputData): Session!
// }

// input UserInputData {
//   username: String!
//   password: String!
// }
// type RootQuery{
//   hello: String
// }
// schema {
//   query: RootQuery
//   mutation: RootMutation
// }
