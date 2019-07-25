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
  }
};
