const db = require("./../models");
const User = db.User;

exports.getUsers = function(req, res) {
  User.find()
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getUser = function(req, res) {
  User.findById(req.params.userId)
    .then(function(foundUser) {
      res.json(foundUser);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateUser = function(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then(function(updatedUser) {
      res.json(updatedUser);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteUser = function(req, res) {
  User.remove({ _id: req.params.userId })
    .then(function() {
      res.json({
        message: `User ${req.params.userId} deleted`,
        userId: req.params.userId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
