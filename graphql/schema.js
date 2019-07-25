const { buildSchema } = require("graphql");

module.exports = buildSchema(`
enum TeamOrderByInput {
  teamName_ASC
  teamName_DESC
  captain_ASC
  captain_DESC
  manager_ASC
  manager_DESC
  wins_ASC
  wins_DESC
  losses_ASC
  losses_DESC
  ties_ASC
  ties_DESC
  championships_ASC
  championships_DESC
}
enum MatchOrderByInput {
  createdAt_ASC
  createdAt_DESC
}
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
    login(userInput: UserInputData): Session!
  }

  input UserInputData {
    username: String!
    password: String!
  }

  type MatchFeed {
    matches: [Match!]!
    matchesCount: Int!
  }

  type Match {
    id: ID!
    scoreKeeper: User!
    awayTeam: String!
    homeTeam: String!
    awayTeamScore: Int
    homeTeamScore: Int
    currentInning: String
    matchType: String
    balls: Int
    strikes: Int
    fouls: Int
    outs: Int
    extraInnings: Boolean!
    encroachmentWarning: Boolean!
    matchComplete: Boolean!
    matchLength: Int!
    lengthMeasured: String!
    startTime: String
  }

  type TeamFeed {
    teams: [Team!]!
    teamsCount: Int!
  }

  type Team {
    id: ID!
    teamName: String
    Manager: User
    wins: Int
    losses: Int
    ties: Int
    championships: Int
  }

  type RootQuery{
    hello: String
    matchFeed(
      filter: String
      skip: Int
      first: Int
      last: Int
      orderBy: MatchOrderByInput
    ): MatchFeed!
    teamFeed(
      filter: String
      skip: Int
      first: Int
      last: Int
      orderBy: TeamOrderByInput
    ): TeamFeed!
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
