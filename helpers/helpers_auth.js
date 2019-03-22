const db = require("./../models");
const User = db.User;

exports.signin = function(req, res) {
  console.log("req.body", req.body);
  User.findOne({ email: req.body.username })
    .then(function(user) {
      console.log("user", user);
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

module.exports = exports;
