const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      minlength: 1
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    atBats: {
      type: Number,
      default: 0,
      min: 0
    },
    kicks: {
      type: Number,
      default: 0,
      min: 0
    },
    walks: {
      type: Number,
      default: 0,
      min: 0
    },
    pitchingOuts: {
      type: Number,
      default: 0,
      min: 0
    },
    inningsPitched: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
