const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      required: true,
      default: "3"
    },
    profilePicture: {
      type: String
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  const user = this;
  // confirm username is email
  // if(!user.isModified('username')) return next();
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10).then(
    function(hashedPassword) {
      user.password = hashedPassword;
      next();
    },
    function(err) {
      return next(err);
    }
  );
});

userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
