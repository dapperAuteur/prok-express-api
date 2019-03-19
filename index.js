const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const leagueRoutes = require("./routes/routes_leagues");
const matchRoutes = require("./routes/routes_matches");
const playerRoutes = require("./routes/routes_players");
const scheduleRoutes = require("./routes/routes_schedules");
const tagRoutes = require("./routes/routes_tags");
const teamRoutes = require("./routes/routes_teams");
const userRoutes = require("./routes/routes_users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Let's Play Kickball"));

const apiVersion = "/api/ver0001";

app.get(`${apiVersion}/leagues`, leagueRoutes);
app.post(`${apiVersion}/leagues`, leagueRoutes);
app.get(`${apiVersion}/leagues/:leagueId`, leagueRoutes);
app.patch(`${apiVersion}/leagues/:leagueId`, leagueRoutes);
app.put(`${apiVersion}/leagues/:leagueId`, leagueRoutes);
app.delete(`${apiVersion}/leagues/:leagueId`, leagueRoutes);
app.use(`${apiVersion}/leagues`, leagueRoutes);

app.get(`${apiVersion}/matches`, matchRoutes);
app.post(`${apiVersion}/matches`, matchRoutes);
app.get(`${apiVersion}/matches/:matchId`, matchRoutes);
app.patch(`${apiVersion}/matches/:matchId`, matchRoutes);
app.put(`${apiVersion}/matches/:matchId`, matchRoutes);
app.delete(`${apiVersion}/matches/:matchId`, matchRoutes);
app.use(`${apiVersion}/matches`, matchRoutes);

app.get(`${apiVersion}/players`, playerRoutes);
app.post(`${apiVersion}/players`, playerRoutes);
app.get(`${apiVersion}/players/:playerId`, playerRoutes);
app.patch(`${apiVersion}/players/:playerId`, playerRoutes);
app.put(`${apiVersion}/players/:playerId`, playerRoutes);
app.delete(`${apiVersion}/players/:playerId`, playerRoutes);
app.use(`${apiVersion}/players`, playerRoutes);

app.get(`${apiVersion}/schedules`, scheduleRoutes);
app.post(`${apiVersion}/schedules`, scheduleRoutes);
app.get(`${apiVersion}/schedules/:scheduleId`, scheduleRoutes);
app.patch(`${apiVersion}/schedules/:scheduleId`, scheduleRoutes);
app.put(`${apiVersion}/schedules/:scheduleId`, scheduleRoutes);
app.delete(`${apiVersion}/schedules/:scheduleId`, scheduleRoutes);
app.use(`${apiVersion}/schedules`, scheduleRoutes);

app.get(`${apiVersion}/tags`, tagRoutes);
app.post(`${apiVersion}/tags`, tagRoutes);
app.get(`${apiVersion}/tags/:tagId`, tagRoutes);
app.patch(`${apiVersion}/tags/:tagId`, tagRoutes);
app.put(`${apiVersion}/tags/:tagId`, tagRoutes);
app.delete(`${apiVersion}/tags/:tagId`, tagRoutes);
app.use(`${apiVersion}/tags`, tagRoutes);

app.get(`${apiVersion}/teams`, teamRoutes);
app.post(`${apiVersion}/teams`, teamRoutes);
app.get(`${apiVersion}/teams/:teamId`, teamRoutes);
app.patch(`${apiVersion}/teams/:teamId`, teamRoutes);
app.put(`${apiVersion}/teams/:teamId`, teamRoutes);
app.delete(`${apiVersion}/teams/:teamId`, teamRoutes);
app.use(`${apiVersion}/teams`, teamRoutes);

app.get(`${apiVersion}/users`, userRoutes);
app.post(`${apiVersion}/users`, userRoutes);
app.get(`${apiVersion}/users/:userId`, userRoutes);
app.patch(`${apiVersion}/users/:userId`, userRoutes);
app.put(`${apiVersion}/users/:userId`, userRoutes);
app.delete(`${apiVersion}/users/:userId`, userRoutes);
app.use(`${apiVersion}/users`, userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`));
