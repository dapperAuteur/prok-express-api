exports.loginRequired = function(req, res, next) {
  const user = req.session.user;
  // console.log("user 3", user);
  if (user._id) {
    // console.log("user 5", user);
    next();
  } else {
    res.status(401).json({ message: "Please log in first" });
  }
  // res.status(401).json({
  //   message: "There was a problem with your request. Are you logged in?"
  // });
};

exports.ensureCorrectUserRole = function(req, res, next) {
  const user = req.session.user;
  const userRole = parseInt(user.userRole);
  if (userRole < 3) {
    next();
  } else {
    res.status(401).json({
      message: "You do NOT have the proper credentials for this action."
    });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  const user = req.session.user;
  if (user._id === req.body.user._id) {
    next();
  } else {
    res.status(401).json({
      message: "You are NOT allowed to access another player's content."
    });
  }
};

module.exports = exports;
