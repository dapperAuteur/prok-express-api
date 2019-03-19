const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    homeTeamKickingOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
      }
    ],
    homeTeamScore: {
      type: Number,
      default: 0,
      min: 0
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    awayTeamKickingOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
      }
    ],
    awayTeamScore: {
      type: Number,
      default: 0,
      min: 0
    },
    locationAddress: {
      type: String
    },
    locationName: {
      type: String
    },
    locationGPS: {
      type: String
    },
    locationCity: {
      type: String
    },
    locationState: {
      type: String
    },
    locationZipCode: {
      type: String
    },
    field: {
      type: String
    },
    currentInning: {
      type: String,
      default: "Bottom 1"
    },
    balls: {
      type: Number,
      default: 0,
      min: 0,
      max: 4
    },
    strikes: {
      type: Number,
      default: 0,
      min: 0,
      max: 3
    },
    fouls: {
      type: Number,
      default: 0,
      min: 0,
      max: 4
    },
    outs: {
      type: Number,
      default: 0,
      min: 0,
      max: 3
    },
    encroachmentWarning: {
      type: Boolean,
      default: false
    },
    matchLength: {
      type: Number,
      default: 6,
      min: 3
    },
    lengthMeasured: {
      type: String,
      default: "Innings"
    },
    startTime: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
