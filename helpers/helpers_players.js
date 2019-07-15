const db = require("./../models");
const io = require("./../socket");
const Player = db.Player;

exports.getPlayers = function(req, res) {
  Player.find()
    .then(function(players) {
      res.json(players);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.createPlayer = function(req, res) {
  Player.create(req.body)
    .then(function(newPlayer) {
      io.getIO().emit("createPlayer", {
        action: "createPlayer",
        newPlayer: newPlayer
      });
      res.status(201).json(newPlayer);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getPlayer = function(req, res) {
  Player.findById(req.params.playerId)
    .then(function(foundPlayer) {
      res.json(foundPlayer);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updatePlayer = function(req, res) {
  Player.findOneAndUpdate({ _id: req.params.playerId }, req.body, { new: true })
    .then(function(updatedPlayer) {
      io.getIO().emit("updatedPlayer", {
        action: "updatedPlayer",
        updatedPlayer: updatedPlayer
      });
      res.json(updatedPlayer);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deletePlayer = function(req, res) {
  Player.remove({ _id: req.params.playerId })
    .then(function() {
      res.json({
        message: `Player ${req.params.playerId} deleted`,
        playerId: req.params.playerId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
