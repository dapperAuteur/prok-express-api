require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const authMiddleware = require("./middleware/middleware_auth");

const authRoutes = require("./routes/routes_auth");
const leagueRoutes = require("./routes/routes_leagues");
const matchRoutes = require("./routes/routes_matches");
const playerRoutes = require("./routes/routes_players");
const scheduleRoutes = require("./routes/routes_schedules");
const tagRoutes = require("./routes/routes_tags");
const teamRoutes = require("./routes/routes_teams");
const userRoutes = require("./routes/routes_users");

const MAX_AGE = 1000 * 60 * 60;
const IN_PROD = process.env.NODE_ENV === "production";

const config = {
  origin: "http://localhost:3000",
  credentials: true
};

const PORT = process.env.PORT || 8080;

app.use(cors(config));

// app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`));

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/prok-db", {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(result => {
    const server = app.listen(PORT, () =>
      console.log(`app is listening on PORT ${PORT}`)
    );
    const io = require("./socket").init(server);
    io.on("connect", socket => {
      console.log("client connected");
    });
  });

app.use(
  session({
    cookie: {
      maxAge: MAX_AGE,
      sameSite: true,
      secure: IN_PROD
    },
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Let's Play Kickball"));

const apiVersion = "/api/ver0001";

app.get(`${apiVersion}/leagues`, leagueRoutes);
app.post(`${apiVersion}/leagues`, authMiddleware.loginRequired, leagueRoutes);
app.get(`${apiVersion}/leagues/:leagueId`, leagueRoutes);
app.patch(
  `${apiVersion}/leagues/:leagueId`,
  authMiddleware.loginRequired,
  leagueRoutes
);
app.put(
  `${apiVersion}/leagues/:leagueId`,
  authMiddleware.loginRequired,
  leagueRoutes
);
app.delete(
  `${apiVersion}/leagues/:leagueId`,
  authMiddleware.loginRequired,
  leagueRoutes
);
app.use(`${apiVersion}/leagues`, leagueRoutes);

app.get(`${apiVersion}/matches`, matchRoutes);
app.post(`${apiVersion}/matches`, authMiddleware.loginRequired, matchRoutes);
app.get(`${apiVersion}/matches/:matchId`, matchRoutes);
app.patch(
  `${apiVersion}/matches/:matchId`,
  authMiddleware.loginRequired,
  matchRoutes
);
app.put(
  `${apiVersion}/matches/:matchId`,
  authMiddleware.loginRequired,
  matchRoutes
);
app.delete(`${apiVersion}/matches/:matchId`, matchRoutes);
app.use(`${apiVersion}/matches`, matchRoutes);

app.get(`${apiVersion}/players`, playerRoutes);
app.post(`${apiVersion}/players`, authMiddleware.loginRequired, playerRoutes);
app.get(`${apiVersion}/players/:playerId`, playerRoutes);
app.patch(
  `${apiVersion}/players/:playerId`,
  authMiddleware.loginRequired,
  playerRoutes
);
app.put(
  `${apiVersion}/players/:playerId`,
  authMiddleware.loginRequired,
  playerRoutes
);
app.delete(
  `${apiVersion}/players/:playerId`,
  authMiddleware.loginRequired,
  playerRoutes
);
app.use(`${apiVersion}/players`, playerRoutes);

app.get(`${apiVersion}/schedules`, scheduleRoutes);
app.post(
  `${apiVersion}/schedules`,
  authMiddleware.loginRequired,
  scheduleRoutes
);
app.get(`${apiVersion}/schedules/:scheduleId`, scheduleRoutes);
app.patch(
  `${apiVersion}/schedules/:scheduleId`,
  authMiddleware.loginRequired,
  scheduleRoutes
);
app.put(
  `${apiVersion}/schedules/:scheduleId`,
  authMiddleware.loginRequired,
  scheduleRoutes
);
app.delete(
  `${apiVersion}/schedules/:scheduleId`,
  authMiddleware.loginRequired,
  scheduleRoutes
);
app.use(`${apiVersion}/schedules`, scheduleRoutes);

app.get(`${apiVersion}/tags`, tagRoutes);
app.post(`${apiVersion}/tags`, authMiddleware.loginRequired, tagRoutes);
app.get(`${apiVersion}/tags/:tagId`, tagRoutes);
app.patch(`${apiVersion}/tags/:tagId`, authMiddleware.loginRequired, tagRoutes);
app.put(`${apiVersion}/tags/:tagId`, authMiddleware.loginRequired, tagRoutes);
app.delete(
  `${apiVersion}/tags/:tagId`,
  authMiddleware.loginRequired,
  tagRoutes
);
app.use(`${apiVersion}/tags`, tagRoutes);

app.get(`${apiVersion}/teams`, teamRoutes);
app.post(`${apiVersion}/teams`, authMiddleware.loginRequired, teamRoutes);
app.get(`${apiVersion}/teams/:teamId`, teamRoutes);
app.patch(
  `${apiVersion}/teams/:teamId`,
  authMiddleware.loginRequired,
  teamRoutes
);
app.put(
  `${apiVersion}/teams/:teamId`,
  authMiddleware.loginRequired,
  teamRoutes
);
app.delete(
  `${apiVersion}/teams/:teamId`,
  authMiddleware.loginRequired,
  teamRoutes
);
app.use(`${apiVersion}/teams`, teamRoutes);

app.get(`${apiVersion}/users`, userRoutes);
app.post(`${apiVersion}/users`, authMiddleware.loginRequired, userRoutes);
app.get(`${apiVersion}/users/:userId`, userRoutes);
app.patch(
  `${apiVersion}/users/:userId`,
  authMiddleware.loginRequired,
  userRoutes
);
app.put(
  `${apiVersion}/users/:userId`,
  authMiddleware.loginRequired,
  userRoutes
);
app.delete(
  `${apiVersion}/users/:userId`,
  authMiddleware.loginRequired,
  userRoutes
);
app.use(`${apiVersion}/users`, userRoutes);

app.use(`${apiVersion}/auth`, authRoutes);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`));
