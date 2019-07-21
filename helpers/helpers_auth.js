const db = require("./../models");
const User = db.User;

exports.signin = function(req, res) {
  User.findOne({ username: req.body.username })
    .then(function(currentUser) {
      currentUser.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          currentUser.password = "";
          // req.session.user = user;
          req.session.currentUser = currentUser;
          res.session = req.session;
          // console.log("res 12", res.session);
          // console.log("res.cookie", res.cookie);
          // res.cookie = ("session",res.session);
          res.status(201).json({ session: res.session });
        } else {
          res.status(400).json({ message: "Invalid Email/Password." });
        }
      });
    })
    .catch(function(err) {
      res.status(400).json({ message: "Invalid Email/Password." });
    });
};

exports.signup = function(req, res, next) {
  User.create(req.body)
    .then(function(currentUser) {
      currentUser.password = "";
      // req.session.user = user;
      req.session.currentUser = currentUser;
      res.session = req.session;
      res.status(201).json({ session: res.session });
    })
    .catch(function(err) {
      res.status(400).json(err);
    });
};

exports.signout = function(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.log("err", err);
      res.status(400).json(err);
    }
    res.clearCookie("sid");
    res.status(201).json({ message: "user logged out" });
  });
};

module.exports = exports;
