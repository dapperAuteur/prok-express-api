const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/prok-db", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
});

// module.exports.Captain = require("./captain");
module.exports.League = require("./league");
// module.exports.Manager = require("./manager");
module.exports.Match = require("./match");
module.exports.Player = require("./player");
module.exports.Schedule = require("./schedule");
module.exports.Tag = require("./tag");
module.exports.Team = require("./team");
module.exports.User = require("./user");
