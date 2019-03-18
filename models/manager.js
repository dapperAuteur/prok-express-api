const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;
