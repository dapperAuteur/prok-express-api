const mongoose = requrie("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    leagueName: {
      type: String,
      required: true
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      }
    ],
    leagueManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule"
      }
    ]
  },
  {
    timestamps: true
  }
);

const League = mongoose.model("League", leagueSchema);
module.exports = League;
