const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    default: "Team",
    required: true,
    minlength: 3
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }
  ],
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player"
  },
  Manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  wins: {
    type: Number,
    default: 0,
    min: 0
  },
  losses: {
    type: Number,
    default: 0,
    min: 0
  },
  ties: {
    type: Number,
    default: 0,
    min: 0
  },
  championships: {
    type: Number,
    default: 0,
    min: 0
  }
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
