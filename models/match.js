const mongoose = require("mongoose");

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
    currentInning: {
      type: String,
      default: "TOP 1ST",
      enum: [
        "TOP 1ST",
        "BOTTOM 1ST",
        "TOP 2ND",
        "BOTTOM 2nd",
        "TOP 3RD",
        "BOTTOM 3RD",
        "TOP 4TH",
        "BOTTOM 4TH",
        "TOP 5TH",
        "BOTTOM 5TH",
        "TOP 6TH",
        "BOTTOM 6TH",
        "MATCH OVER"
      ]
    },
    matchType: {
      type: String,
      default: "FRIENDLY",
      enum: ["FRIENDLY", "SEASON", "PLAYOFF", "TOURNAMENT", "CHARITY"]
    },
    extraInnings: {
      type: Boolean,
      default: false
    },
    matchComplete: {
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
      default: "INNINGS",
      enum: ["INNINGS", "TIME"]
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
