const db = require("./../models");
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
