const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersSchedules = require("./../helpers/helpers_schedules");

router
  .route("/")
  .get(helpersSchedules.getSchedules)
  .post(helpersSchedules.createSchedule);

router
  .route("/:scheduleId")
  .get(helpersSchedules.getSchedule)
  .put(helpersSchedules.updateSchedule)
  .patch(helpersSchedules.updateSchedule)
  .delete(helpersSchedules.deleteSchedule);

module.exports = router;
