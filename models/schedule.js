const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match"
    }
  ],
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
