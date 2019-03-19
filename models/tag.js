const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      minlength: 3
    },
    tagDescription: {
      type: String,
      required: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
