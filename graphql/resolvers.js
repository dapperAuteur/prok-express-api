const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("./../models/user");
const Match = require("./../models/match");
const Team = require("./../models/team");

module.exports = {
  hello() {
    return "hello world";
  },
  signUp: async function({ userInput }, req) {
    const { username, password } = userInput;
    const errors = [];
    if (!validator.isEmail(username)) {
      errors.push({ message: "username must be a valid email" });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    ) {
      errors.push({ message: "password is too short" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid user input");
      error.data = errors;
      error.code = 422;
      console.log("error", error);
      throw error;
    }
    const existingUser = await User.findOne({ username: userInput.username });
    if (existingUser) {
      const error = new Error("User exists already");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      username: userInput.username,
      password: hashedPw
    });
    const createdUser = await user.save();
    createdUser.password = "";
    req.session.currentUser = createdUser;
    req.session.user = createdUser;
    return {
      ...req.session
    };
  },
  login: async function({ userInput }, req) {
    console.log("userInput", userInput);
    const { username, password } = userInput;
    const errors = [];
    const user = await User.findOne({ username: userInput.username });
    if (!user) {
      errors.push({ message: "invalid username/password" });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      errors.push({ message: "invalid username/password" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid user input");
      error.data = errors;
      error.code = 422;
      console.log("error", error);
      throw error;
    }
    req.session.currentUser = user;
    req.session.user = user;
    return {
      ...req.session
    };
  },
  matchFeed: async function(req, res) {
    const matchesCount = await Match.find().countDocuments();
    const matches = Match.find();
    return {
      matches,
      matchesCount
    };
  },
  teamFeed: async function(req, res) {
    const teamsCount = await Team.find().countDocuments();
    const teams = Team.find();
    return {
      teams,
      teamsCount
    };
  },
  userFeed: async function(req, res) {
    const usersCount = await User.find().countDocuments();
    const users = User.find();
    return {
      users,
      usersCount
    };
  },
  createMatch: async function({ userInput }, req) {
    const { scoreKeeper, awayTeam, homeTeam } = userInput;
    const errors = [];
    console.log("scoreKeeper", scoreKeeper);
    const scoreKeeperFound = await User.findById({ _id: scoreKeeper });
    console.log("scoreKeeperFound", scoreKeeperFound);
    if (!scoreKeeperFound) {
      console.log("104 scoreKeeperFound", scoreKeeperFound);
      errors.push({ message: "scoreKeeper not found" });
    }
    const awayTeamFound = await Team.findById({ _id: awayTeam });
    console.log("awayTeamFound", awayTeamFound);
    if (!awayTeamFound) {
      errors.push({ message: "awayTeam not found" });
    }
    const homeTeamFound = await Team.findById({ _id: homeTeam });
    console.log("homeTeamFound", homeTeamFound);
    if (!homeTeamFound) {
      errors.push({ message: "homeTeam not found" });
    }
    if (errors.length > 0) {
      const error = new Error("invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const newMatch = new Match({
      scoreKeeper: scoreKeeperFound._id,
      awayTeam: awayTeamFound._id,
      homeTeam: homeTeamFound._id
    });
    const createdMatch = await newMatch.save();
    req.createdMatch = createdMatch;
    console.log("req.data", req);
    return {
      ...createdMatch._doc,
      _id: createdMatch._id.toString(),
      createdAt: createdMatch.createdAt.toISOString(),
      updatedAt: createdMatch.updatedAt.toISOString()
    };
  }
};
