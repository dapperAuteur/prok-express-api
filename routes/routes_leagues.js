const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersLeagues = require("./../helpers/helpers_leagues");

router
  .route("/")
  .get(helpersLeagues.getLeagues)
  .post(helpersLeagues.createLeague);

router
  .route("/:leagueId")
  .get(helpersLeagues.getLeague)
  .put(helpersLeagues.updateLeague)
  .patch(helpersLeagues.updateLeague)
  .delete(helpersLeagues.deleteLeague);

module.exports = router;
