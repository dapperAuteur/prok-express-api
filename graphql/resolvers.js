const bcrypt = require("bcrypt");
const User = require("./../models/user");
const Match = require("./../models/match");

module.exports = {
  hello() {
    return "hello world";
  },
  signUp: async function({ userInput }, req) {
    const { username, password } = userInput;
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
    // console.log("0 req.session", req.session);
    req.session.currentUser = createdUser;
    req.session.user = createdUser;
    // console.log("1 req.session", req.session);
    return {
      ...req.session
      // ...createdUser._doc,
      // _id: createdUser._id.toString()
    };
  },
  matchFeed: async function(req, res) {
    const matchesCount = await Match.find().countDocuments();
    const matches = Match.find();
    return {
      matches,
      matchesCount
    };
  }
};
