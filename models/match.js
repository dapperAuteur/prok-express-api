const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    homeTeamScore: {
      type: Number,
      default: 0,
      min: 0
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
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
