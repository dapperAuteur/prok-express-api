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

  type UserFeed {
    users: [User!]!
    usersCount: Int!
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
    _id: ID!
    scoreKeeper: User!
    awayTeam: String!
    homeTeam: String!
    awayTeamScore: Int
    homeTeamScore: Int
    awayTeamKickingOrder: [Player!]!
    homeTeamKickingOrder: [Player!]!
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

  input MatchInputData {
    scoreKeeper: String!
    awayTeam: String!
    homeTeam: String!
  }
  input UpdateMatchInputData {
    _id: String!
    awayTeamScore: String
    homeTeamScore: String
    balls: String
    strikes: String
    fouls: String
    outs: String
    currentInning: String
  }

  type Player {
    _id: ID!
    nickname: String
    userId: User!
    atBats: Int
    kicks: Int
    walks: Int
    pitchingOuts: Int
    inningsPitched: Int
    currentlyPlaying: Boolean
  }

  type TeamFeed {
    teams: [Team!]!
    teamsCount: Int!
  }

  type Team {
    _id: ID!
    teamName: String
    Manager: User
    wins: Int
    losses: Int
    ties: Int
    championships: Int
  }

  type RootQuery{
    login(userInput: UserInputData): Session!
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
    userFeed(
      filter: String
      skip: Int
      first: Int
      last: Int
    ): UserFeed!
  }

  type RootMutation {
    signUp(userInput: UserInputData): Session!
    login(userInput: UserInputData): Session!
    createMatch(userInput: MatchInputData): Match!
    updateMatch(userInput: UpdateMatchInputData): Match!
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
