const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersUsers = require("./../helpers/helpers_users");

router.route("/").get(helpersUsers.getUsers);

router
  .route("/:userId")
  .get(helpersUsers.getUser)
  .put(helpersUsers.updateUser)
  .patch(helpersUsers.updateUser)
  .delete(helpersUsers.deleteUser);

module.exports = router;
