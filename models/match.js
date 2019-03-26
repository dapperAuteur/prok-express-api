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
