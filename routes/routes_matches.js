const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersMatches = require("./../helpers/helpers_matches");

router
  .route("/")
  .get(helpersMatches.getMatches)
  .post(helpersMatches.createMatch);

router
  .route("/:matchId")
  .get(helpersMatches.getMatch)
  .put(helpersMatches.updateMatch)
  .patch(helpersMatches.updateMatch)
  .delete(helpersMatches.deleteMatch);

module.exports = router;
