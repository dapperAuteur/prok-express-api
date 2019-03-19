const db = require("./../models");
const Match = db.Match;

exports.getMatches = function(req, res) {
  Match.find()
    .then(function(matches) {
      res.json(matches);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getMatch = function(req, res) {
  Match.findById(req.params.matchId)
    .then(function(foundMatch) {
      res.json(foundMatch);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateMatch = function(req, res) {
  Match.findOneAndUpdate({ _id: req.params.matchId }, req.body, { new: true })
    .then(function(updatedMatch) {
      res.json(updatedMatch);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteMatch = function(req, res) {
  Match.remove({ _id: req.params.matchId })
    .then(function() {
      res.json({
        message: `Match ${req.params.matchId} deleted`,
        matchId: req.params.matchId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
