const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersTeams = require("./../helpers/helpers_teams");

router
  .route("/")
  .get(helpersTeams.getTeams)
  .post(helpersTeams.createTeam);

router
  .route("/:teamId")
  .get(helpersTeams.getTeam)
  .put(helpersTeams.updateTeam)
  .patch(helpersTeams.updateTeam)
  .delete(helpersTeams.deleteTeam);

module.exports = router;
