const db = require("./../models");
const Team = db.Team;

exports.getTeams = function(req, res) {
  Team.find()
    .then(function(teams) {
      res.json(teams);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getTeam = function(req, res) {
  Team.findById(req.params.teamId)
    .then(function(foundTeam) {
      res.json(foundTeam);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateTeam = function(req, res) {
  Team.findOneAndUpdate({ _id: req.params.teamId }, req.body, {
    new: true
  })
    .then(function(updatedTeam) {
      res.json(updatedTeam);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteTeam = function(req, res) {
  Team.remove({ _id: req.params.teamId })
    .then(function() {
      res.json({
        message: `Team ${req.params.teamId} deleted`,
        teamId: req.params.teamId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
