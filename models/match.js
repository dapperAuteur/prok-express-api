const mongoose = require("mongoose");
// checking if gitkraken is the issue
const matchSchema = new mongoose.Schema(
  {
    scoreKeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "5d22970a499e9942a5834873"
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: "5c9a9ef3e6814f122a1af324"
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
      ref: "Team",
      default: "5c9a9e2be6814f122a1af322"
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
      default: "Top 1st",
      enum: [
        "Top 1st",
        "Bottom 1st",
        "Top 2nd",
        "Bottom 2nd",
        "Top 3rd",
        "Bottom 3rd",
        "Top 4th",
        "Bottom 4th",
        "Top 5th",
        "Bottom 5th",
        "Top 6th",
        "Bottom 6th",
        "MATCH OVER"
      ]
    },
    extraInnings: {
      type: Boolean,
      default: false
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
