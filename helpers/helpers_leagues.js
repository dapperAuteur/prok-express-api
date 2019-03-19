const db = require("./../models");
const League = db.League;

exports.getLeagues = function(req, res) {
  League.find()
    .then(function(leagues) {
      res.json(leagues);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.createLeague = function(req, res) {
  League.create(req.body)
    .then(function(newLeague) {
      res.status(201).json(newLeague);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getLeague = function(req, res) {
  League.findById(req.params.leagueId)
    .then(function(foundLeague) {
      res.json(foundLeague);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateLeague = function(req, res) {
  League.findOneAndUpdate({ _id: req.params.leagueId }, req.body, { new: true })
    .then(function(updatedLeague) {
      res.json(updatedLeague);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteLeague = function(req, res) {
  League.remove({ _id: req.params.leagueId })
    .then(function() {
      res.json({
        message: `League ${req.params.leagueId} deleted`,
        leagueId: req.params.leagueId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
