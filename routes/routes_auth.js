const express = require("express");
const router = express.Router();
const helpersAuth = require("./../helpers/helpers_auth");

router.post("/sign-in", helpersAuth.signin);
router.post("/sign-up", helpersAuth.signup);
router.post("/sign-out", helpersAuth.signout);

module.exports = router;
