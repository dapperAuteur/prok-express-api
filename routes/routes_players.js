const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersPlayers = require("./../helpers/helpers_players");

router
  .route("/")
  .get(helpersPlayers.getPlayers)
  .post(helpersPlayers.createPlayer);

router
  .route("/:playerId")
  .get(helpersPlayers.getPlayer)
  .put(helpersPlayers.updatePlayer)
  .patch(helpersPlayers.updatePlayer)
  .delete(helpersPlayers.deletePlayer);

module.exports = router;
