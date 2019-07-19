const mongoose = require("mongoose");

const matchLocationSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match"
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
    }
  },
  {
    timestamps: true
  }
);

const MatchLocation = mongoose.model("MatchLocation", matchLocationSchema);
module.exports = MatchLocation;
