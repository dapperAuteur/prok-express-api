const db = require("./../models");
const User = db.User;

exports.signin = function(req, res) {
  User.findOne({ username: req.body.username })
    .then(function(user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          user.password = "";
          req.session.user = user;
          res.status(201).json(user);
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
    .then(function(user) {
      user.password = "";
      req.session.user = user;
      res.status(201).json(user);
    })
    .catch(function(err) {
      res.status(400).json(err);
    });
};

exports.signout = function(req, res) {
  req.session.destroy(err => {
    if (err) {
      res.status(400).json(err);
    }
    res.clearCookie(SESS_NAME);
    res.status(201).json({ message: "user logged out" });
  });
};

module.exports = exports;
