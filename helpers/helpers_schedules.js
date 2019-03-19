const db = require("./../models");
const Schedule = db.Schedule;

exports.getSchedules = function(req, res) {
  Schedule.find()
    .then(function(schedules) {
      res.json(schedules);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.createSchedule = function(req, res) {
  Schedule.create(req.body)
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getSchedule = function(req, res) {
  Schedule.findById(req.params.scheduleId)
    .then(function(foundSchedule) {
      res.json(foundSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateSchedule = function(req, res) {
  Schedule.findOneAndUpdate({ _id: req.params.scheduleId }, req.body, {
    new: true
  })
    .then(function(updatedSchedule) {
      res.json(updatedSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteSchedule = function(req, res) {
  Schedule.remove({ _id: req.params.scheduleId })
    .then(function() {
      res.json({
        message: `Schedule ${req.params.scheduleId} deleted`,
        scheduleId: req.params.scheduleId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
