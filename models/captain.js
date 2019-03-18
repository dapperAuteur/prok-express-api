const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema(
  {
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;
